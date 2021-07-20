import json
from pathlib import Path

from ._version import __version__
from .handlers import NotificationHandler

HERE = Path(__file__).parent.resolve()


with (HERE / "labextension" / "package.json").open() as fid:
    data = json.load(fid)

def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": data["name"]
    }]

def _jupyter_server_extension_points():
    """
    Returns a list of dictionaries with metadata describing
    where to find the `_load_jupyter_server_extension` function.
    """
    return [{"module": "jupyterlab_notifications"}]

def _load_jupyter_server_extension(server_app):
    """
    This function is called when the extension is loaded.
    """
    handlers = [
        ('/notifications/', NotificationHandler)
    ]
    server_app.web_app.add_handlers('.*$', handlers)

# For backward compatibility
load_jupyter_server_extension = _load_jupyter_server_extension