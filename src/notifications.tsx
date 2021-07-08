import useStore from "./useStore";
import { setStore, getStore } from "./useStore";
import React from "react";
import ImgMediaCard from "./card";
import { ReactWidget } from "@jupyterlab/apputils";

export function systemNotification(title: string, desc: string, url: string) {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  } else {
    const notification = new Notification(title, {
      icon: "http://Your_Website.com/logo.png",
      body: desc,
    });

    /* Remove the notification from Notification Center when clicked.*/
    notification.onclick = function () {
      window.open(url);
    };

    /* Callback function when the notification is closed. */
    notification.onclose = function () {
      console.log("Notification closed");
    };
  }
}

export function NotificationCenter(props: any) {
  const [store, setStore] = useStore();

  let handleClick = () => {
    console.log(store);
    setStore({ ls: [...store.ls, "newElement"] });
    // const yarray = ydoc.getArray('notif')
    // console.log(yarray.toArray(), "yjs print");
    // ydoc.getArray('notif').insert(0, [6,7,8]);
    // console.log(ydoc.getArray('notif').toArray(), "print2");
  };
  return (
    <div>
      {store.ls.map((image: string): any => (
        <ImgMediaCard title={image} />
      ))}
      <button onClick={() => handleClick()}>Activate Lasers</button>
    </div>
  );
}

export function addNotification(name: string) {
  let store = getStore();
  setStore({ ls: [...store.ls, name] });
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
