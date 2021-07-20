from jupyter_server.base.handlers import JupyterHandler
import tornado

class NotificationHandler(JupyterHandler):

    #@tornado.web.authenticated
    def get(self):
        print("GET")
        self.write("GET self.write")

    #@tornado.web.authenticated
    def post(self):
        print("POST")
        self.write("POST self.write")