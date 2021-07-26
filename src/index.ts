import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from "@jupyterlab/application";
import "bootstrap/dist/css/bootstrap.min.css";
import { Widget } from "@lumino/widgets";
import * as Icons from "@jupyterlab/ui-components";
import "react-toastify/dist/ReactToastify.css";
import "../style/main.css"

import * as Y from "yjs";
// import { YDocument } from "@jupyterlab/shared-models";
import { NotebookActions } from "@jupyterlab/notebook";
import { ICommandPalette, MainAreaWidget } from "@jupyterlab/apputils";
import { ToolbarButton } from "@jupyterlab/apputils";
import { DocumentRegistry } from "@jupyterlab/docregistry";
import { INotebookModel, NotebookPanel } from "@jupyterlab/notebook";
import { IDisposable } from "@lumino/disposable";
//import { requestAPI } from './handler';

import {
  systemNotification,
  notifyInCenter,
  notificationWidget,
} from "./notifications";

// import React from 'react';

// import { List } from '@material-ui/core';
const ydoc = new Y.Doc();

ydoc.getArray("notif").insert(0, [1, 2, 3]);

class ButtonExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  createNew(
    panel: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    const mybutton = new ToolbarButton({
      label: "Push Notif",
      onClick: () => {
        const yarray = ydoc.getArray("notif");
        console.log(yarray.toArray(), "yjs print");
        ydoc.getArray("notif").insert(0, [6, 7, 8]);
        console.log(ydoc.getArray("notif").toArray(), "print2");
        const notification = {
          title: "Button Press",
          body: "Button in Notebook has been pressed!",
          url: "url",
        };
        systemNotification(notification);
        notifyInCenter(notification);
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

    const content: Widget = new notificationWidget();
    const widget = new MainAreaWidget({ content });
    widget.id = "apod-jupyterlab";
    widget.title.closable = true;
    widget.title.icon = Icons.jupyterFaviconIcon;
    app.shell.add(widget, "right", { rank: 500 });
    const your_button = new ButtonExtension();
    app.docRegistry.addWidgetExtension("Notebook", your_button);
    NotebookActions.executed.connect((_, args) => {
      const { cell, notebook } = args;
      const codeCell = cell.model.type === "code";
      const nonEmptyCell = cell.model.value.text.length > 0;
      const metadata = cell.model.metadata;
      if (codeCell && nonEmptyCell) {
        if (metadata.has("execution")) {
          const notebookName = notebook.title.label.replace(/\.[^/.]+$/, "");
          const notification = {
            title: "Cell Execution!",
            body: `Cell has finished executing in ${notebookName}.ipynb!`,
            url: "www.google.com",
          };
          notifyInCenter(notification);
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
