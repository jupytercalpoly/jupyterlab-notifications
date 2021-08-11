import React, { useEffect, useState } from "react";
import { INotificationStoreObject } from ".";

export let store = {
  originStore: [] as INotificationStoreObject[],
};
let listeners: React.Dispatch<any>[] = [];

// setStore(store => ({...store, isFoo: false}))
export function setStore(val: typeof store | ((s: typeof store) => typeof store)): void {
  if (typeof val === "object" && val !== null) {
    store = val;
  } else {
    store = val(store);
  }
  listeners.forEach((l) => l(val));
}

export function getStore(): (typeof store) {
  return { ...store };
}

// setStore(store => {
//     return {...store }
// })

export default function useStore(): [
  (typeof store), typeof setStore
] {
  const listener = useState<any>()[1];
  useEffect(() => {
    listeners.push(listener);
    return () => void (listeners = listeners.filter((l) => l === listener));
  }, []);
  return [store, setStore];
}
