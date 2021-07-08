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
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifications */ "./lib/notifications.js");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_5__);



// import { InputDialog } from '@jupyterlab/apputils';
// import * as Widgets from '@lumino/widgets';

// import { ToastContainer, toast } from 'react-toastify';


// import * as Y from 'yjs'
// import { YDocument } from '@jupyterlab/shared-models';
// // import Toast from 'react-bootstrap/Toast';

// const store:React.Dispatch<any>[]  = []

// import { NotebookActions } from '@jupyterlab/notebook';

// import { List } from '@material-ui/core';
// const ydoc = YDocument.ydoc
// ydoc.getArray('notif') .insert(0, [1, 2, 3])
class ButtonExtension {
    createNew(panel, context) {
        const mybutton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton({
            label: 'Push Notification',
            onClick: () => {
                // this.strEle.push("ayo");
                (0,_notifications__WEBPACK_IMPORTED_MODULE_6__.addNotification)("newElement");
                document.addEventListener('DOMContentLoaded', () => {
                    if (Notification.permission !== 'granted') {
                        Notification.requestPermission();
                    }
                });
                (0,_notifications__WEBPACK_IMPORTED_MODULE_6__.systemNotification)('myTitle', 'myDesc', 'www.example.com');
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
        const content = new MyWidget();
        const widget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.MainAreaWidget({ content });
        widget.id = 'apod-jupyterlab';
        widget.title.closable = true;
        widget.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.jupyterFaviconIcon;
        app.shell.add(widget, 'right', { rank: 500 });
        const your_button = new ButtonExtension();
        app.docRegistry.addWidgetExtension('Notebook', your_button);
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_5__.NotebookActions.executed.connect((_, args) => {
            const { cell, notebook } = args;
            const codeCell = cell.model.type === 'code';
            const nonEmptyCell = cell.model.value.text.length > 0;
            const metadata = cell.model.metadata;
            if (codeCell && nonEmptyCell) {
                if (metadata.has('execution')) {
                    const notebookName = notebook.title.label.replace(/\.[^/.]+$/, '');
                    (0,_notifications__WEBPACK_IMPORTED_MODULE_6__.addNotification)(notebookName);
                }
            }
            else {
                alert('Notebook Cell Timing needs to be enabled for Jupyterlab Notifications to work. ' +
                    'Please go to Settings -> Advanced Settings Editor -> Notebook and update setting to {"recordTiming": true}');
            }
        });
    }
};
class MyWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ReactWidget {
    constructor() {
        super();
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_notifications__WEBPACK_IMPORTED_MODULE_6__.NotificationCenter, null)));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ }),

/***/ "./lib/notifications.js":
/*!******************************!*\
  !*** ./lib/notifications.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "systemNotification": () => (/* binding */ systemNotification),
/* harmony export */   "NotificationCenter": () => (/* binding */ NotificationCenter),
/* harmony export */   "addNotification": () => (/* binding */ addNotification)
/* harmony export */ });
/* harmony import */ var _useStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useStore */ "./lib/useStore.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./card */ "./lib/card.js");




function systemNotification(title, desc, url) {
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
function NotificationCenter(props) {
    const [store, setStore] = (0,_useStore__WEBPACK_IMPORTED_MODULE_1__.default)();
    let handleClick = () => {
        console.log(store);
        setStore({ ls: [...store.ls, "newElement"] });
        // const yarray = ydoc.getArray('notif')
        // console.log(yarray.toArray(), "yjs print");
        // ydoc.getArray('notif').insert(0, [6,7,8]);
        // console.log(ydoc.getArray('notif').toArray(), "print2");
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
        store.ls.map((image) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_card__WEBPACK_IMPORTED_MODULE_2__.default, { title: image }))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: () => handleClick() }, "Activate Lasers")));
}
function addNotification(name) {
    let store = (0,_useStore__WEBPACK_IMPORTED_MODULE_1__.getStore)();
    (0,_useStore__WEBPACK_IMPORTED_MODULE_1__.setStore)({ ls: [...store.ls, name] });
}


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
//# sourceMappingURL=lib_index_js-webpack_sharing_consume_default_react-dom.a6e7b3c05b989acbca7c.js.map