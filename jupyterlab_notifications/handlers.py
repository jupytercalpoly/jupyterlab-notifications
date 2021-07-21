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


import sqlite3

def populateDB():
    con = sqlite3.connect('/mnt/f/git/jupyterlab-notifications/example.db')
    cur = con.cursor()

    # Create table
    cur.execute('''CREATE TABLE stocks
                (date text, trans text, symbol text, qty real, price real)''')

    # Insert a row of data
    cur.execute("INSERT INTO stocks VALUES ('2006-01-05','BUY','RHAT',100,35.14)")

    # Save (commit) the changes
    con.commit()

    # We can also close the connection if we are done with it.
    # Just be sure any changes have been committed or they will be lost.
    con.close()


class testHandler(APIHandler):
    @tornado.web.authenticated
    async def get(self, path: str = ""):
        print("got here")
        self.finish(json.dumps({"data": "This is /jlab-ext-example/hello endpoint!"}))

    @tornado.web.authenticated
    async def post(self, path: str = ""):
        populateDB()




def setup_handlers(web_app):
    """
    Setups all of the git command handlers.
    Every handler is defined here, to be used in git.py file.
    """


    handlers = [
        ("/notifications", testHandler),

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