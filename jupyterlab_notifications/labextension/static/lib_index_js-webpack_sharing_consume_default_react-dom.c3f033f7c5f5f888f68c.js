(self["webpackChunkjupyterlab_notifications"] = self["webpackChunkjupyterlab_notifications"] || []).push([["lib_index_js-webpack_sharing_consume_default_react-dom"],{

/***/ "./lib/card.js":
/*!*********************!*\
  !*** ./lib/card.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImgMediaCard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/makeStyles.js");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Card */ "./node_modules/@material-ui/core/esm/Card/Card.js");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "./node_modules/@material-ui/core/esm/CardActionArea/CardActionArea.js");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardContent */ "./node_modules/@material-ui/core/esm/CardContent/CardContent.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");






const useStyles = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__.default)({
    root: {
        maxWidth: 345
    }
});
function ImgMediaCard(props) {
    const classes = useStyles();
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_2__.default, { className: classes.root },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_3__.default, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__.default, null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__.default, { gutterBottom: true, variant: "h5", component: "h2" }, props.title),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__.default, { variant: "body2", color: "textSecondary", component: "p" }, props.body)))));
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _useStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useStore */ "./lib/useStore.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./card */ "./lib/card.js");



// import { InputDialog } from '@jupyterlab/apputils';


// import { ToastContainer, toast } from 'react-toastify';

// import Toast from 'react-bootstrap/Toast';



// const store:React.Dispatch<any>[]  = []


// import { NotebookActions } from '@jupyterlab/notebook';

// import { List } from '@material-ui/core';
function customnotify(title, desc, url) {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
    else {
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
class ButtonExtension {
    constructor(strEle) {
        this.strEle = strEle;
    }
    createNew(panel, context) {
        // Create the toolbar button
        const mybutton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton({
            label: 'This one',
            onClick: () => {
                console.log(this.strEle);
                // this.strEle.push("ayo");
                let store = (0,_useStore__WEBPACK_IMPORTED_MODULE_7__.getStore)();
                (0,_useStore__WEBPACK_IMPORTED_MODULE_7__.setStore)({ ls: [...store.ls, "newElement"] });
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
const plugin = {
    id: 'jupyterlab-todo:plugin',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ICommandPalette],
    activate: async (app, palette) => {
        let temp = ["test1", "test2"];
        const content = new MyWidget(temp);
        const widget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.MainAreaWidget({ content });
        widget.id = 'apod-jupyterlab';
        widget.title.closable = true;
        widget.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.jupyterFaviconIcon;
        app.shell.add(widget, 'right', { rank: 500 });
        let panel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Panel();
        panel.id = "Notifications center";
        panel.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.listIcon;
        // app.shell.add(panel, 'right', {rank:500});
        app.shell.add(panel, 'left', { rank: 300 });
        panel.addClass('my-apodWidget');
        const your_button = new ButtonExtension(temp);
        app.docRegistry.addWidgetExtension('Notebook', your_button);
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_6__.NotebookActions.executed.connect((_, args) => {
            const { cell, notebook } = args;
            const codeCell = cell.model.type === 'code';
            const nonEmptyCell = cell.model.value.text.length > 0;
            const metadata = cell.model.metadata;
            if (codeCell && nonEmptyCell) {
                if (metadata.has('execution')) {
                    const notebookName = notebook.title.label.replace(/\.[^/.]+$/, '');
                    const store = (0,_useStore__WEBPACK_IMPORTED_MODULE_7__.getStore)();
                    (0,_useStore__WEBPACK_IMPORTED_MODULE_7__.setStore)({ ls: [...store.ls, notebookName] });
                }
            }
            else {
                alert('Notebook Cell Timing needs to be enabled for Jupyterlab Notifications to work. ' +
                    'Please go to Settings -> Advanced Settings Editor -> Notebook and update setting to {"recordTiming": true}');
            }
        });
    }
};
// interface IState {
//   myStr?: string[];
// }
class MyWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ReactWidget {
    constructor(arr) {
        super();
        this.arr = arr;
    }
    render() {
        // const list = [<App str={this.strEle} />, <App str={this.strEle} />];
        // List.extend(<App str="hello" />)
        return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(NotificationCenter, { arr: this.arr })));
    }
}
// import {useState} from 'react';
function NotificationCenter(props) {
    const [store, setStore] = (0,_useStore__WEBPACK_IMPORTED_MODULE_7__.default)();
    // setStore({ls: props.arr});
    // const [store, setStore]= useState(props.arr);
    console.log(store.ls + "this is a test statement");
    let handleClick = () => {
        console.log(store);
        setStore({ ls: [...store.ls, "newElement"] });
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null,
        store.ls.map((image) => (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_card__WEBPACK_IMPORTED_MODULE_8__.default, { title: image }))),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", { onClick: () => handleClick() }, "Activate Lasers")));
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ }),

/***/ "./lib/useStore.js":
/*!*************************!*\
  !*** ./lib/useStore.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => (/* binding */ store),
/* harmony export */   "setStore": () => (/* binding */ setStore),
/* harmony export */   "getStore": () => (/* binding */ getStore),
/* harmony export */   "default": () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

let store = { ls: ["card1", "card2"] };
let listeners = [];
// setStore(store => ({...store, isFoo: false}))
function setStore(val) {
    if (typeof val === "object" && val !== null) {
        store = val;
    }
    else {
        store = val(store);
    }
    store = val;
    listeners.forEach(l => l(val));
}
function getStore() {
    return Object.assign({}, store);
}
// setStore(store => {
//     return {...store }
// })
function useStore() {
    const listener = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)()[1];
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        listeners.push(listener);
        return () => void (listeners = listeners.filter(l => l === listener));
    }, []);
    return [store, setStore];
}


/***/ })

}]);
//# sourceMappingURL=lib_index_js-webpack_sharing_consume_default_react-dom.c3f033f7c5f5f888f68c.js.map