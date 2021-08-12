import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from "@jupyterlab/application";
import "bootstrap/dist/css/bootstrap.min.css";
import { Widget } from "@lumino/widgets";
import * as Icons from "@jupyterlab/ui-components";
import "react-toastify/dist/ReactToastify.css";
import "../style/main.css";

// import { YDocument } from "@jupyterlab/shared-models";
import { NotebookActions } from "@jupyterlab/notebook";
import { ICommandPalette, MainAreaWidget } from "@jupyterlab/apputils";
import { ToolbarButton } from "@jupyterlab/apputils";
import { DocumentRegistry } from "@jupyterlab/docregistry";
import { INotebookModel, NotebookPanel } from "@jupyterlab/notebook";
import { IDisposable } from "@lumino/disposable";
//import { requestAPI } from './handler';
import {
  // systemNotification,
  notificationWidget,
  notifyInCenter,
} from "./notifications";

import { activateNotifier } from "./token";
import { v4 as uuidv4 } from "uuid";
// import React from 'react';

// import { List } from '@material-ui/core';

export interface INotificationResponse {
  notificationId: string;
  origin: string;
  title: string;
  body: string;
  subject?: string;
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
  subject?: string;
  recipient?: string;
  linkUrl?: string;
  ephemeral?: boolean;
  notifTimeout?: number;
  notifType?: string;
}

export interface INotificationRequestParameters {
  subject: string;
  recipient: string;
  created: string;
}

export interface INotificationStoreObject {
  origin: string;
  notifications: INotificationResponse[];
}

class ButtonExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  createNew(
    panel: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    const mybutton = new ToolbarButton({
      label: "Push Notif",
      onClick: async () => {
        const dataToSend = {
          origin: "button extension",
          title: Math.random().toString(),
          body: "this is notiffrom new",
          linkUrl: "googl.com",
          ephemeral: true,
          notifTimeout: 18,
          notifType: "web",
        };
        let notifier = activateNotifier();
        notifier.post(dataToSend);
        // try {
        //   const reply = await requestAPI<any>("notifications", {
        //     body: JSON.stringify(dataToSend),
        //     method: "POST",
        //   });
        //   ignoreNotifs.set(reply["RowId"], null);
        //   console.log(reply);
        //   console.log("this was invoked");
        // } catch (reason) {
        //   console.error(
        //     `Error on POST /api/notifications ${dataToSend}.\n${reason}`
        //   );
        // }
        document.addEventListener("DOMContentLoaded", () => {
          if (Notification.permission !== "granted") {
            Notification.requestPermission();
          }
        });
      },
    });

    // Add the toolbar button to the notebook toolbar
    panel.toolbar.insertItem(10, "mybutton", mybutton);

    return mybutton;
  }
}

/**
 * Initialization data for the jupyterlab-todo extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab-todo:plugin",
  autoStart: true,
  requires: [ICommandPalette],

  activate: async (app: JupyterFrontEnd, palette: ICommandPalette) => {
    // console.log('Attempting GET');
    // // GET request
    // try {
    //   const data = await requestAPI<any>('hello');
    //   console.log(data);
    // } catch (reason) {
    //   console.error(`Error on GET /jlab-ext-example/hello.\n${reason}`);
    // }

    if (!localStorage.getItem("notifications-UUID")) {
      localStorage.setItem("notifications-UUID", uuidv4());
      localStorage.setItem("originStore", JSON.stringify([]));
      console.log("UUID = ", localStorage.getItem("UUID"));
      console.log("originStore = ", localStorage.getItem("originStore"));
      let username = prompt("Enter your username", "");
      localStorage.setItem("notifications-username", username!);
      localStorage.setItem("notifications-lastDate", "0");
    } else {
      console.log("UUID = ", localStorage.getItem("notifications-UUID"));
      console.log("originStore = ", localStorage.getItem("originStore"));
    }
    notifyInCenter(JSON.parse(localStorage.getItem("originStore")!));
    let ws = new WebSocket("ws://localhost:8888/api/ws");
    ws.onopen = function () {
      ws.send("Hello, world");
    };
    ws.onmessage = async function (rowId) {
      try {
        console.log(rowId.data);
        console.log("this was also invoked");
        let notifier = activateNotifier();
        const notification = await notifier.getNotification(rowId.data);
        if (notification) {
          let originStore: INotificationStoreObject[] = JSON.parse(
            localStorage.getItem("originStore")!
          );
          const i = originStore.findIndex(
            (obj) => obj.origin === notification["origin"]
          );
          if (i === -1) {
            originStore.unshift({
              origin: notification["origin"],
              notifications: [notification],
            });
          } else {
            let t = originStore.splice(i, 1);
            t[0].notifications.unshift(notification);
            originStore.unshift(t[0]);
          }
          // if (notification["origin"] in originStore) {
          //   originStore[notification["origin"]].push(notification);
          // } else {
          //   originStore[notification["origin"]] = [notification];
          // }
          localStorage.setItem("originStore", JSON.stringify(originStore));
          console.log("originStore = ", localStorage.getItem("originStore"));
          notifyInCenter(originStore);
          localStorage.setItem(
            "notifications-lastDate",
            notification["created"]
          );
        }
      } catch (reason) {
        console.error(`Error on GET /api/notifications.\n${reason}`);
      }
    };

    const content: Widget = new notificationWidget();
    const widget = new MainAreaWidget({ content });
    widget.id = "apod-jupyterlab";
    widget.title.closable = true;
    widget.title.icon = Icons.jupyterFaviconIcon;
    app.shell.add(widget, "right", { rank: 500 });
    const your_button = new ButtonExtension();
    app.docRegistry.addWidgetExtension("Notebook", your_button);
    NotebookActions.executed.connect(async (_, args) => {
      const { cell, notebook } = args;
      const codeCell = cell.model.type === "code";
      const nonEmptyCell = cell.model.value.text.length > 0;
      const metadata = cell.model.metadata;
      if (codeCell && nonEmptyCell) {
        if (metadata.has("execution")) {
          const notebookName = notebook.title.label.replace(/\.[^/.]+$/, "");
          const dataToSend = {
            origin: "cell execution",
            title: Math.random().toString(),
            body: notebookName,
            linkUrl: "googl.com",
            ephemeral: true,
            notifTimeout: 18,
            notifType: "web",
          };
          let notifier = activateNotifier();
          notifier.post(dataToSend);
          // try {
          //   const reply = await requestAPI<any>("notifications", {
          //     body: JSON.stringify(dataToSend),
          //     method: "POST",
          //   });
          //   ignoreNotifs.set(reply["RowId"], null);
          //   console.log(reply);
          //   console.log("this was invoked");
          // } catch (reason) {
          //   console.error(
          //     `Error on POST /api/notifications ${dataToSend}.\n${reason}`
          //   );
          // }
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

export default plugin;
