
import json
from pathlib import Path
from .handlers import setup_handlers


from ._version import __version__

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
    """Registers the API handler to receive HTTP requests from the frontend extension.
    Parameters
    ----------
    server_app: jupyterlab.labapp.LabApp
        JupyterLab application instance
    """
    # config = JupyterLabGit(config=server_app.config)
    # server_app.web_app.settings["git"] = Git(config)
    setup_handlers(server_app.web_app)


load_jupyter_server_extension = _load_jupyter_server_extension