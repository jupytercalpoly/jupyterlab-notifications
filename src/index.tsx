import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Widget } from '@lumino/widgets';
import { ReactWidget } from '@jupyterlab/apputils';
// import { InputDialog } from '@jupyterlab/apputils';
import * as Widgets from '@lumino/widgets';
import * as Icons from '@jupyterlab/ui-components';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Toast from 'react-bootstrap/Toast';


import { NotebookActions } from '@jupyterlab/notebook';


import useStore  from "./useStore"
import {setStore, getStore}  from "./useStore"
// const store:React.Dispatch<any>[]  = []
import ImgMediaCard from "./card"


import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
// import { NotebookActions } from '@jupyterlab/notebook';
import { ToolbarButton } from '@jupyterlab/apputils';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook';
import { IDisposable } from '@lumino/disposable';
// import { List } from '@material-ui/core';

function customnotify(title: string, desc: string, url: string) {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  } else {
    const notification = new Notification(title, {
      icon: 'http://Your_Website.com/logo.png',
      body: desc
    });

    /* Remove the notification from Notification Center when clicked.*/
    notification.onclick = function () {
      window.open(url);
    };

    /* Callback function when the notification is closed. */
    notification.onclose = function () {
      console.log('Notification closed');
    };
  }
}

class ButtonExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    public strEle: string[];
    constructor(strEle:string[]){
        this.strEle = strEle;
  
      }
    createNew(
    panel: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    // Create the toolbar button
    const mybutton = new ToolbarButton({
      label: 'This one',
      onClick: () => {
        console.log(this.strEle);
        // this.strEle.push("ayo");
        let store = getStore();
        setStore({ls: [...store.ls, "newElement"] });

        document.addEventListener('DOMContentLoaded', () => {
          if (Notification.permission !== 'granted') {
            Notification.requestPermission();
          }
        });
        customnotify('myTitle', 'myDesc', 'www.example.com');
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
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-todo:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  
  activate  : async (app: JupyterFrontEnd, palette: ICommandPalette) => {
    let temp = ["test1", "test2"];
    const content: Widget = new MyWidget(temp);
    const widget = new MainAreaWidget({ content });
    widget.id = 'apod-jupyterlab';
    widget.title.closable = true;
    widget.title.icon = Icons.jupyterFaviconIcon;
    app.shell.add(widget, 'right', {rank:500});
    let panel = new Widgets.Panel();
    panel.id = "Notifications center";
    panel.title.icon = Icons.listIcon;
    // app.shell.add(panel, 'right', {rank:500});
    app.shell.add(panel, 'left', {rank:300});
    panel.addClass('my-apodWidget');
    const your_button = new ButtonExtension(temp);
    app.docRegistry.addWidgetExtension('Notebook', your_button);
    NotebookActions.executed.connect((_, args) => {
        const { cell, notebook } = args;
        const codeCell = cell.model.type === 'code';
        const nonEmptyCell = cell.model.value.text.length > 0;
        const metadata = cell.model.metadata;
        if (codeCell && nonEmptyCell) {
          if (metadata.has('execution')) {
            const notebookName = notebook.title.label.replace(
              /\.[^/.]+$/,
              ''
            );
            const store = getStore();
            setStore({ls: [...store.ls, notebookName] });
            }
          } else {
            alert(
              'Notebook Cell Timing needs to be enabled for Jupyterlab Notifications to work. ' +
                'Please go to Settings -> Advanced Settings Editor -> Notebook and update setting to {"recordTiming": true}'
            );
          }

      });
  
    
  }
  };




// interface IState {
//   myStr?: string[];
// }
class MyWidget extends ReactWidget {

  public arr : string[];
  constructor(arr:string[]){
    super();
    this.arr = arr;
  }
  render() {
    // const list = [<App str={this.strEle} />, <App str={this.strEle} />];
    // List.extend(<App str="hello" />)
    return (
      <div>
        <NotificationCenter arr={this.arr}/>
      </div>
    )
  }
}

// import {useState} from 'react';

function NotificationCenter(props:any){


  const [store, setStore] = useStore();
  // setStore({ls: props.arr});
  
  // const [store, setStore]= useState(props.arr);
  console.log(store.ls + "this is a test statement");


  let handleClick = () => {
    console.log(store);
    setStore({ls: [...store.ls, "newElement"] });
  }
  return (
    <div>
      {store.ls.map( (image:string) : any => (
          <ImgMediaCard title={image} />
        ))}
       <button onClick={() => handleClick()}>
         Activate Lasers
       </button>
       {/* <Button1/> */}
       {/* <Button2/> */}
    </div>
  )
}

// function Button1() {
//   const [store, setStore] = useStore();
//   setStore({ls: [...store.ls,  "newElement"] });
//     console.log(store.ls);
//     //  console.log(store.isFoo + "this one ss")
    
//   return <button onClick={() => setStore({isFoo: !store.isFoo})}>
//     {store.ls[0]}
//     </button>
// }


// function Button2() {
//   const [store, setStore] = useStore();

//   return <button onClick={() => setStore({isFoo: !store.isFoo, bar: ""})}>
//     {store.isFoo ? "bar" : "foo"}
//     </button>
// }


  // function App(props:any){
  //   // const notify = () => toast("Wow so easy!");

  //   return (
  //     <div style={{ display: 'block',
  //                   width: 700, 
  //                   padding: 30 }}>
  //       <h4>React-Bootstrap Toast Component</h4>
  //       <Toast>
  //         <Toast.Header>
  //           <img alt="Sample Image" width="20px"
  // src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
  //             className="rounded mr-2" />
  //           <strong className="mr-auto">
  //              Testinggggg
  //           </strong>
  //           <small>
  //              Last Seen: 1 hour ago 
  //           </small>
  //         </Toast.Header>
  //         <Toast.Body>
  //              {props.str}
  //         </Toast.Body>
  //       </Toast>
  //     </div>
  //   );
  // }


export default plugin;