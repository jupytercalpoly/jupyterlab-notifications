import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
// import { InputDialog } from '@jupyterlab/apputils';
// import * as Widgets from '@lumino/widgets';
import * as Icons from '@jupyterlab/ui-components';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { systemNotification, NotificationCenter, addNotification } from './notifications';
// import * as Y from 'yjs'
// import { YDocument } from '@jupyterlab/shared-models';
// // import Toast from 'react-bootstrap/Toast';
import { NotebookActions } from '@jupyterlab/notebook';
// const store:React.Dispatch<any>[]  = []
import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
// import { NotebookActions } from '@jupyterlab/notebook';
import { ToolbarButton } from '@jupyterlab/apputils';
// import { List } from '@material-ui/core';
// const ydoc = YDocument.ydoc
// ydoc.getArray('notif') .insert(0, [1, 2, 3])
class ButtonExtension {
    createNew(panel, context) {
        const mybutton = new ToolbarButton({
            label: 'Push Notification',
            onClick: () => {
                // this.strEle.push("ayo");
                addNotification("newElement");
                document.addEventListener('DOMContentLoaded', () => {
                    if (Notification.permission !== 'granted') {
                        Notification.requestPermission();
                    }
                });
                systemNotification('myTitle', 'myDesc', 'www.example.com');
            }
        });
        // Add the toolbar button to the notebook toolbar
        panel.toolbar.insertItem(10, 'mybutton', mybutton);
        // The ToolbarButton class implements `IDisposable`, so the
        // button is the extension for the purposes of this method.
        return mybutton;
    }
}
/**
 * Initialization data for the jupyterlab-todo extension.
 */
const plugin = {
    id: 'jupyterlab-todo:plugin',
    autoStart: true,
    requires: [ICommandPalette],
    activate: async (app, palette) => {
        const content = new MyWidget();
        const widget = new MainAreaWidget({ content });
        widget.id = 'apod-jupyterlab';
        widget.title.closable = true;
        widget.title.icon = Icons.jupyterFaviconIcon;
        app.shell.add(widget, 'right', { rank: 500 });
        const your_button = new ButtonExtension();
        app.docRegistry.addWidgetExtension('Notebook', your_button);
        NotebookActions.executed.connect((_, args) => {
            const { cell, notebook } = args;
            const codeCell = cell.model.type === 'code';
            const nonEmptyCell = cell.model.value.text.length > 0;
            const metadata = cell.model.metadata;
            if (codeCell && nonEmptyCell) {
                if (metadata.has('execution')) {
                    const notebookName = notebook.title.label.replace(/\.[^/.]+$/, '');
                    addNotification(notebookName);
                }
            }
            else {
                alert('Notebook Cell Timing needs to be enabled for Jupyterlab Notifications to work. ' +
                    'Please go to Settings -> Advanced Settings Editor -> Notebook and update setting to {"recordTiming": true}');
            }
        });
    }
};
class MyWidget extends ReactWidget {
    constructor() {
        super();
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(NotificationCenter, null)));
    }
}
export default plugin;
