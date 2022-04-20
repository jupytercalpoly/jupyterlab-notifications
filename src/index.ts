import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from "@jupyterlab/application";
import "bootstrap/dist/css/bootstrap.min.css";
import { Panel, Widget } from "@lumino/widgets";
import "react-toastify/dist/ReactToastify.css";
import "../style/main.css";
import { NotebookActions } from "@jupyterlab/notebook";
import { INotification } from "jupyterlab_toastify";
import { getStore, setStore } from "./useStore";
import { notificationWidget, notifyInCenter } from "./NotificationCenter";
import notifIcon from "../style/icons/notifIcon.svg";
import { LabIcon } from "@jupyterlab/ui-components";
import { INotifier, Notifier } from "./token";
import { v4 as uuidv4 } from "uuid";

export { INotifier } from './token';

const chatIcon = new LabIcon({
  name: "jitsi:notif",
  svgstr: notifIcon,
});

export interface INotificationResponse {
  notificationId: string;
  subject: string; // TODO: rename to filename
  origin: string;
  title: string;
  body: string;
  recipient?: string;
  linkUrl?: string;
  ephemeral?: boolean;
  notifTimeout?: number;
  notifType?: string;
  created: string;
}

export interface INotificationEvent {
  origin: string;
  title: string;
  body: string;
  subject: string;
  recipient?: string;
  linkUrl?: string;
  ephemeral?: boolean;
  notifTimeout?: number;
  notifType?: string;
}

export interface INotificationRequestParameters {
  subject?: string;
  recipient?: string;
  created?: string;
}

export interface INotificationStoreObject {
  subject: string;
  notifications: INotificationResponse[];
}

/**
 * Initialization data for the jupyterlab-todo extension.
 */
const center: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab-notifications:center",
  autoStart: true,
  requires: [INotifier],

  activate: async (app: JupyterFrontEnd, notifier: INotifier) => {
    if (!localStorage.getItem("notifications-UUID")) {
      localStorage.setItem("notifications-UUID", uuidv4());
      let username = prompt("Enter your username", "");
      localStorage.setItem("notifications-username", username!);
      localStorage.setItem("notifications-lastDate", "0");
    }
    if (!localStorage.getItem("blocked-origins")) {
      localStorage.setItem("blocked-origins", JSON.stringify([]));
    } else {
      let store = getStore();
      const blockedOrigins = JSON.parse(
        localStorage.getItem("blocked-origins")!
      );
      store.blockedOrigins = blockedOrigins;
      setStore(store);
    }

    //UPDATE THIS WHEN QUERY FUNCTION WORKS
    let parameters = {
      subject: "",
      recipient: localStorage.getItem("notifications-username")!,
      created: localStorage.getItem("notifications-lastDate")!,
    };
    if (localStorage.getItem("notifications-lastDate")! === "0") {
      parameters = {
        subject: "",
        recipient: "",
        created: "",
      };
    }

    let notificationsList = await notifier.getNotificationWithParameters(
      parameters
    );
    if (notificationsList) {
      let store = getStore();
      notificationsList = notificationsList.filter(
        (notifRespObj) => !store.blockedOrigins.includes(notifRespObj.origin)
      );
      const subjectStore = [...store.subjectStore];

      for (let index = 0; index < notificationsList.length; index++) {
        const s = subjectStore.findIndex(
          (obj) => obj.subject === notificationsList![index].subject
        );
        if (s == -1) {
          subjectStore.push({
            subject: notificationsList[index].subject,
            notifications: [notificationsList[index]],
          });
        } else {
          subjectStore[s].notifications.push(notificationsList[index]);
        }
      }
      notifyInCenter(subjectStore);
      if (notificationsList.length > 0) {
        localStorage.setItem(
          "notifications-lastDate",
          notificationsList[notificationsList.length - 1].created
        );
      }
    }
    let ws = new WebSocket(
      "ws://" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/api/ws"
    );
    ws.onopen = function () {
      const dataToSend = {
        origin: "User connections",
        title: "User joined session",
        body:
          localStorage.getItem("notifications-username")! +
          " just connected to the workspace!",
        subject: "User joined session",
        recipient: "harshit",
        linkUrl: "",
        ephemeral: true,
        notifTimeout: 3000,
        notifType: "info",
      };
      notifier.post(dataToSend);
      ws.send("Hello, world");
    };
    ws.onmessage = async (rowId) => {
      try {
        const notification = await notifier.getNotification(rowId.data);
        if (notification) {
          let store = getStore();
          const subjectStore = [...store.subjectStore];

          if (!store.blockedOrigins.includes(notification.origin)) {
            const i = subjectStore.findIndex(
              (obj) => obj.subject === notification["subject"]
            );
            if (i === -1) {
              subjectStore.unshift({
                subject: notification["subject"],
                notifications: [notification],
              });
            } else {
              let t = subjectStore.splice(i, 1);
              t[0].notifications.unshift(notification);
              subjectStore.unshift(t[0]);
            }

            notifyInCenter(subjectStore);
            localStorage.setItem(
              "notifications-lastDate",
              notification["created"]
            );
            void INotification.update({
              toastId: notification.notificationId,
              message: notification.subject + " : " + notification.body,
              type: "info",
              autoClose: notification.notifTimeout,
            });
          }
        }
      } catch (reason) {
        console.error(`Error on ws connection /api/ws.\n${reason}`);
      }
    };

    const content: Widget = new notificationWidget();
    const widget = new Panel();
    widget.addWidget(content);
    widget.id = "apod-jupyterlab";
    widget.title.closable = true;
    widget.title.icon = chatIcon;
    widget.node.style.overflow = "auto";
    app.shell.add(widget, "right", { rank: 500 });
    NotebookActions.executed.connect(async (_, args) => {
      const { cell, notebook } = args;
      const codeCell = cell.model.type === "code";
      const nonEmptyCell = cell.model.value.text.length > 0;
      const metadata = cell.model.metadata;
      if (codeCell && nonEmptyCell) {
        if (metadata.has("execution")) {
          const notebookName = notebook.title.label.replace(/\.[^/.]+$/, "");
          const dataToSend = {
            origin: "Cell execution",
            title: notebookName + ".ipynb",
            body: "Cell finished execution",
            subject: notebookName + ".ipynb",
            recipient: "harshit",
            linkUrl: "",
            ephemeral: true,
            notifTimeout: 4000,
            notifType: "sucess",
          };
          notifier.post(dataToSend);
        }
      } else {
        alert(
          "Notebook Cell Timing needs to be enabled for Jupyterlab Notifications to work. " +
            'Please go to Settings -> Advanced Settings Editor -> Notebook and update setting to {"recordTiming": true}'
        );
      }
    });
  },
};

const notifier: JupyterFrontEndPlugin<INotifier> = {
  id: "jupyterlab-notifications:notifier",
  provides: INotifier,
  autoStart: true,
  activate: (app: JupyterFrontEnd): INotifier => new Notifier()
}

export default [center, notifier];
