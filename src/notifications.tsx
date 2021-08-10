import useStore from "./useStore";
import { getStore, setStore } from "./useStore";
import React from "react";
import ImgMediaCard from "./card";
import { ReactWidget } from "@jupyterlab/apputils";

export function systemNotification(notification: any) {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  } else {
    const notificationObj = new Notification(notification.title, {
      icon: "http://Your_Website.com/logo.png",
      body: notification.body,
    });

    /* Remove the notification from Notification Center when clicked.*/
    notificationObj.onclick = function () {
      window.open(notification.url);
    };

    /* Callback function when the notification is closed. */
    notificationObj.onclose = function () {
      console.log("Notification closed");
    };
  }
}

export function NotificationCenter(props: any) {
  const [store, setStore] = useStore();

  let handleClick = () => {
    console.log(store);
    setStore({
      ls: [
        ...store.ls,
        { title: "newElement", body: "newBody", id: Date.now().toString() },
      ],
    });
    // const yarray = ydoc.getArray('notif')
    // console.log(yarray.toArray(), "yjs print");
    // ydoc.getArray('notif').insert(0, [6,7,8]);
    // console.log(ydoc.getArray('notif').toArray(), "print2");
  };
  return (
    <div>
      {store.ls.map((notif: any): any => (
        <ImgMediaCard title={notif.title} body={notif.body} id={notif.id}>
          {/* control={ */}
        </ImgMediaCard>
      ))}
      <button onClick={() => handleClick()}>Activat Lasers</button>
    </div>
  );
}

export function notifyInCenter(notification: any) {
  const title = notification.title;
  const body = notification.body;
  let store = getStore();
  setStore({
    ls: [...store.ls, { title: title, body: body, id: Date.now().toString() }],
  });
}

export class notificationWidget extends ReactWidget {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <NotificationCenter />
      </div>
    );
  }
}
