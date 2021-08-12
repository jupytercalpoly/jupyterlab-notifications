import sqlite3
import functools
import json
import os
from pathlib import Path
from typing import Tuple, Union
import time

import tornado
import tornado.websocket as websocketT
from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
from packaging.version import parse

wss = []


class wsHandler(websocketT.WebSocketHandler):
    def open(self):
        print('Online')
        if self not in wss:
            wss.append(self)

    def on_message(self, message):
        for client in wss:
            if client != self:
                client.write_message(message)

    def on_close(self):
        print('Offline')
        if self in wss:
            wss.remove(self)


def wsSend(message):
    for ws in wss:
        ws.write_message(message)


NAMESPACE = "/api"


conn = sqlite3.connect('notif.db')
c = conn.cursor()
try:
    c.execute('''CREATE TABLE IF NOT EXISTS notifs (notificationId  INTEGER PRIMARY KEY, origin text, title text,body text, linkUrl text,ephemeral boolean, notifTimeout INTEGER, notifType text,created INTEGER)''')
except sqlite3.OperationalError:
    pass
except:
    print("BOOM?")
c.close()


class notifyBaseHandler(APIHandler):
    @tornado.web.authenticated
    async def get(self, path: str = ""):

        args = (self.request.arguments)
        created, origin = "", ""
        con = sqlite3.connect('notif.db')
        cur = con.cursor()
        data = ""
        if "created" in args and "origin" in args:
            created, origin = args["created"][0].decode(
            ), args["origin"][0].decode()
            cur.execute('SELECT * FROM notifs where created >= ? and origin = ?',
                        (str(created), str(origin)))
            data = cur.fetchall()
        elif "created" in args:
            created = args["created"][0].decode()
            cur.execute('SELECT * FROM notifs where created >= ?',
                        (str(created),))
            data = cur.fetchall()
        elif "origin" in args:
            origin = args["origin"][0].decode()
            cur.execute('SELECT * FROM notifs where origin = ?',
                        (str(origin),))
            data = cur.fetchall()
        else:
            cur.execute('SELECT * FROM notifs')
            data = cur.fetchall()
        responses = []
        for row in data:
            response = {"notificationId": row[0], "origin": row[1], "title": row[2], "body": row[3],
                        "linkUrl": row[4], "ephemeral": row[5], "notifTimeout": row[6], "notifType": row[7], "created": row[8]}
            responses.append({"INotificationResponse": response})
        self.finish(json.dumps({"Response": responses}))

    @tornado.web.authenticated
    async def post(self, path: str = ""):
        con = sqlite3.connect('notif.db')
        cur = con.cursor()
        # input_data = self.get_json_body()
        # data = {"greetings": "Hello {}, enjoy JupyterLab!".format(input_data["name"])}
        # self.finish(json.dumps(data))
        data = self.get_json_body()["INotificationEvent"]
        # print(data)
        origin = data["origin"]
        title = data["title"]
        body = data["body"]
        linkUrl = data["linkUrl"]
        ephemeral = data["ephemeral"]
        notifTimeout = data["notifTimeout"]
        notifType = data["notifType"]
        created = time.time_ns()

        insertData = (origin, title, body, linkUrl, ephemeral,
                      notifTimeout, notifType, created)
        cur.execute(
            "INSERT INTO notifs ( origin , title ,body , linkUrl ,ephemeral , notifTimeout , notifType ,created ) VALUES (? , ? ,? , ? ,? , ? , ? ,?)", insertData)
        rowId = cur.lastrowid
        con.commit()
        con.close()
        self.set_status(201)
        self.add_header("location", str(rowId))
        # self.write(json.dumps({"RowId":str(rowId)}))
        self.finish(json.dumps({"RowId": str(rowId)}))
        self.flush()
        # tornado.ioloop.IOLoop.make_current()
        # time.sleep(3)
        # tornado.ioloop.IOLoop.current().spawn_callback(wsSend, str(rowId))
        # print("here sennding ws")
        wsSend(str(rowId))


class notifyIDHandler(APIHandler):
    @tornado.web.authenticated
    async def get(self, notificationId):
        # print(notificationId, "THIS WHAT I GOT")
        con = sqlite3.connect('notif.db')
        cur = con.cursor()

# Create table
        cur.execute('SELECT * FROM notifs where notificationId = ?',
                    (notificationId, ))
        data = cur.fetchall()
        response = {}
        for row in data:
            response = {"INotificationResponse": {"notificationId": row[0], "origin": row[1], "title": row[2], "body": row[3],
                        "linkUrl": row[4], "ephemeral": row[5], "notifTimeout": row[6], "notifType": row[7], "created": row[8]}}
            # responses.append({"INotificationResponse": response})
        self.finish(json.dumps({"Response": response}))


def setup_handlers(web_app):
    """
    Setups all of the git command handlers.
    Every handler is defined here, to be used in git.py file.
    """

    handlers = [
        ("/api/ws", wsHandler),
        ("/api/notifications", notifyBaseHandler),
        (r"/api/notifications/([^/]+)", notifyIDHandler),
    ]
    base_url = web_app.settings["base_url"]

    notify_handlers = [
        (url_path_join(base_url, NAMESPACE + endpoint), handler)
        for endpoint, handler in handlers
    ]

    web_app.add_handlers(".*", handlers)
