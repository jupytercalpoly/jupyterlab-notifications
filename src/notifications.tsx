import useStore from "./useStore";
import { setStore } from "./useStore";
import React from "react";
import ImgMediaCard from "./card";
import { ReactWidget } from "@jupyterlab/apputils";
import { INotificationStoreObject } from "./index";

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
    setStore({ ...store });
    // const yarray = ydoc.getArray('notif')
    // console.log(yarray.toArray(), "yjs print");
    // ydoc.getArray('notif').insert(0, [6,7,8]);
    // console.log(ydoc.getArray('notif').toArray(), "print2");
  };
  return (
    <div>
      {store.originStore.map((obj: any): any => (
        <div >
          {obj.origin}
          {obj.notifications.map((notif: any) => (
            <ImgMediaCard
              title={notif.title}
              body={notif.body}
              id={notif.notificationId}
              key={notif.notificationId}
              origin={notif.origin}
            >
              {/* control={ */}
            </ImgMediaCard>
          ))}
        </div>
      ))}
      <button onClick={() => handleClick()}>Activat Lasers</button>
    </div>
  );
}

export function notifyInCenter(updatedStore: INotificationStoreObject[]) {
  setStore({
    originStore: updatedStore,
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
