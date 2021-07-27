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
                client.write_message('ECHO: ' + message)

    def on_close(self):
        print('Offline')
        if self in wss:
            wss.remove(self)


def wsSend(message):
    for ws in wss:
        ws.write_message(message)


NAMESPACE = "/api"


conn = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/notif.db')
c = conn.cursor()
try:
    c.execute('''CREATE TABLE IF NOT EXISTS notifs (notificationId  INTEGER PRIMARY KEY, origin text, title text,body text, linkURL text,ephemeral boolean, notifTimeout INTEGER, notifType text,created INTEGER)''')
except sqlite3.OperationalError:
    pass
c.close()


class notifyBaseHandler(APIHandler):
    @tornado.web.authenticated
    async def get(self, path: str = ""):

        args = (self.request.arguments)
        created, origin = "", ""
        con = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/notif.db')
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
                        "linkURL": row[4], "ephemeral": row[5], "notifTimeout": row[6], "notifType": row[7], "created": row[8]}
            responses.append({"INotificationResponse": response})
        self.finish(json.dumps({"Response": responses}))

    @tornado.web.authenticated
    async def post(self, path: str = ""):
        con = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/notif.db')
        cur = con.cursor()
        # input_data = self.get_json_body()
        # data = {"greetings": "Hello {}, enjoy JupyterLab!".format(input_data["name"])}
        # self.finish(json.dumps(data))
        data = self.get_json_body()["INotificationEvent"]
        origin = data["origin"]
        Title = data["Title"]
        Body = data["Body"]
        LinkURL = data["LinkURL"]
        Ephemeral = data["Ephemeral"]
        NotifTimeout = data["NotifTimeout"]
        NotifType = data["NotifType"]
        Created = time.time_ns()

        insertData = (origin, Title, Body, LinkURL, Ephemeral,
                      NotifTimeout, NotifType, Created)
        cur.execute(
            "INSERT INTO notifs ( origin , Title ,Body , LinkURL ,Ephemeral , NotifTimeout , NotifType ,Created ) VALUES (? , ? ,? , ? ,? , ? , ? ,?)", insertData)

        con.commit()
        con.close()
        wsSend("yelooo")


class notifyIDHandler(APIHandler):
    @tornado.web.authenticated
    async def get(self, notificationId):
        con = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/notif.db')
        cur = con.cursor()

# Create table
        cur.execute('SELECT * FROM notifs where notificationId = ?',
                    (notificationId, ))
        data = cur.fetchall()
        self.finish(json.dumps({"data": data}))


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
