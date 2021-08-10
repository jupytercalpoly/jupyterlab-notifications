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
import { requestAPI } from "./handler";
import {
  // systemNotification,
  notificationWidget,
  notifyInCenter
} from "./notifications";

// import React from 'react';

// import { List } from '@material-ui/core';

export interface INotificationResponse {
  notificationId: string, 
  origin: string,
  title: string,
  body: string,
  linkUrl: string,
  ephemeral: boolean,
  notifTimeout: number,
  notifType: string,
  created: string
}

export interface INotificationEvent {
  origin: string,
  title: string,
  body: string,
  linkUrl: string,
  ephemeral: boolean,
  notifTimeout: number,
  notifType: string
}

const ignoreNotifs = new Map();

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
          INotificationEvent: {
            origin: "google",
            Title: Math.random().toString(),
            Body: "this is notif",
            LinkURL: "google.com",
            Ephemeral: true,
            NotifTimeout: 18,
            NotifType: "web",
          },
        };
        try {
          const reply = await requestAPI<any>("notifications", {
            body: JSON.stringify(dataToSend),
            method: "POST",
          });
          ignoreNotifs.set(reply["RowId"], null);
          console.log(reply);
          console.log("this was invoked");
        } catch (reason) {
          console.error(
            `Error on POST /jlab-ext-example/hello ${dataToSend}.\n${reason}`
          );
        }
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
    let ws = new WebSocket("ws://localhost:8888/api/ws");
    ws.onopen = function () {
      ws.send("Hello, world");
    };
    ws.onmessage = async function (rowId) {
      try {
        console.log(rowId.data);
        console.log("this was also invoked");
        console.log(ignoreNotifs);
        if (!ignoreNotifs.has(rowId.data)) {
          const data = await requestAPI<any>("notifications/" + rowId.data);
          // console.log(data);
          const ls = data["Response"];
          // console.log(ls);
          const notification = ls["INotificationResponse"];
          // systemNotification(notification);
          notifyInCenter(notification);
        }
      } catch (reason) {
        console.error(
          `Error on GET /jlab-ext-example/notifications.\n${reason}`
        );
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
            INotificationEvent: {
              origin: "google",
              Title: Math.random().toString(),
              Body: notebookName,
              LinkURL: "google.com",
              Ephemeral: true,
              NotifTimeout: 18,
              NotifType: "web",
            },
          };
          try {
            const reply = await requestAPI<any>("notifications", {
              body: JSON.stringify(dataToSend),
              method: "POST",
            });
            ignoreNotifs.set(reply["RowId"], null);
            console.log(reply);
            console.log("this was invoked");
          } catch (reason) {
            console.error(
              `Error on POST /jlab-ext-example/hello ${dataToSend}.\n${reason}`
            );
          }
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
