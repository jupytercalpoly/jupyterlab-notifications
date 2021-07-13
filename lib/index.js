import "bootstrap/dist/css/bootstrap.min.css";
import * as Icons from "@jupyterlab/ui-components";
import "react-toastify/dist/ReactToastify.css";
// import * as Y from 'yjs'
// import { YDocument } from '@jupyterlab/shared-models';
import { NotebookActions } from "@jupyterlab/notebook";
import { ICommandPalette, MainAreaWidget } from "@jupyterlab/apputils";
import { ToolbarButton } from "@jupyterlab/apputils";
import { systemNotification, notifyInCenter, notificationWidget, } from "./notifications";
// import React from 'react';
// import { List } from '@material-ui/core';
// const ydoc = YDocument.ydoc
// ydoc.getArray('notif') .insert(0, [1, 2, 3])
class ButtonExtension {
    createNew(panel, context) {
        const mybutton = new ToolbarButton({
            label: "Push Notif",
            onClick: () => {
                const notification = {
                    title: "Button Press",
                    body: "Button in Notebook has been pressed!",
                    url: "url"
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
const plugin = {
    id: "jupyterlab-todo:plugin",
    autoStart: true,
    requires: [ICommandPalette],
    activate: async (app, palette) => {
        const content = new notificationWidget();
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
                        url: "www.google.com"
                    };
                    notifyInCenter(notification);
                }
            }
            else {
                alert("Notebook Cell Timing needs to be enabled for Jupyterlab Notifications to work. " +
                    'Please go to Settings -> Advanced Settings Editor -> Notebook and update setting to {"recordTiming": true}');
            }
        });
    },
};
export default plugin;
