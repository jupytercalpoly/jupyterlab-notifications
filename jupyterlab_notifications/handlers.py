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

class testHandler(APIHandler):
    @tornado.web.authenticated
    async def get(self, path: str = ""):
        response = "success!"

        if response["code"] != 0:
            self.set_status(500)
        self.finish(json.dumps(response))



def setup_handlers(web_app):
    """
    Setups all of the git command handlers.
    Every handler is defined here, to be used in git.py file.
    """


    handlers = [
        ("/test", testHandler),

    ]

    # add the baseurl to our paths
    base_url = web_app.settings["base_url"]
    git_handlers = [
        (url_path_join(base_url, NAMESPACE + path_regex + endpoint), handler)
        for endpoint, handler in handlers_with_path
    ] + [
        (url_path_join(base_url, NAMESPACE + endpoint), handler)
        for endpoint, handler in handlers
    ]

    web_app.add_handlers(".*", git_handlers)