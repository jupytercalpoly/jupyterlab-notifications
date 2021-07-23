import sqlite3
import functools
import json
import os
from pathlib import Path
from typing import Tuple, Union

import tornado
from jupyter_server.base.handlers import APIHandler, path_regex
from jupyter_server.services.contents.manager import ContentsManager
from jupyter_server.utils import url2path, url_path_join
from packaging.version import parse
NAMESPACE = "/api"


conn = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/notif.db')
c = conn.cursor()
try:
    c.execute('''CREATE TABLE IF NOT EXISTS notifs (NotificationID  INTEGER PRIMARY KEY, origin text, Title text,Body text, LinkURL text,Ephemeral boolean, NotifTimeout INTEGER, NotifType text,Created INTEGER)''')
except sqlite3.OperationalError:
    pass
c.close()





class notifyBaseHandler(APIHandler):
    @tornado.web.authenticated
    async def get(self, path: str = ""):
        con = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/notif.db')
        cur = con.cursor()

# Create table
        cur.execute('SELECT * FROM notifs')
        data = cur.fetchall()
        self.finish(json.dumps({"data": data}))

    @tornado.web.authenticated
    async def post(self, path: str = ""):
        con = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/notif.db')
        cur = con.cursor()

        data = self.get_json_body()
        origin = data["origin"]
        Title = data["Title"]
        Body = data["Body"]
        LinkURL = data["LinkURL"]
        Ephemeral = data["Ephemeral"]
        NotifTimeout = data["NotifTimeout"]
        NotifType = data["NotifType"]
        Created = data["Created"]

        insertData = (origin, Title, Body, LinkURL, Ephemeral, NotifTimeout, NotifType, Created)
        # Insert a row of data
        cur.execute(
            "INSERT INTO notifs ( origin , Title ,Body , LinkURL ,Ephemeral , NotifTimeout , NotifType ,Created ) VALUES (? , ? ,? , ? ,? , ? , ? ,?)", insertData)

        # Save (commit) the changes
        con.commit()

        # We can also close the connection if we are done with it.
        # Just be sure any changes have been committed or they will be lost.
        con.close()


class notifyOriginHandler(APIHandler):
    @tornado.web.authenticated
    async def get(self, origin):
        print(origin)
        con = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/notif.db')
        cur = con.cursor()

# Create table
        cur.execute('SELECT * FROM notifs where origin = ?',( origin, ))
        data = cur.fetchall()
        self.finish(json.dumps({"data": data}))

def setup_handlers(web_app):
    """
    Setups all of the git command handlers.
    Every handler is defined here, to be used in git.py file.
    """

    handlers = [
        ("/api/notifications", notifyBaseHandler),
        (r"/api/notifications/([^/]+)", notifyOriginHandler),
    ]
    base_url = web_app.settings["base_url"]
    notify_handlers = [
        (url_path_join(base_url, NAMESPACE + endpoint), handler)
        for endpoint, handler in handlers
    ]
    # add the baseurl to our paths
    # base_url = web_app.settings["base_url"]
    # git_handlers = [
    #     (url_path_join(base_url, NAMESPACE + path_regex + endpoint), handler)
    #     for endpoint, handler in handlers_with_path
    # ] + [
    #     (url_path_join(base_url, NAMESPACE + endpoint), handler)
    #     for endpoint, handler in handlers
    # ]

    web_app.add_handlers(".*", handlers)
