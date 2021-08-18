import useStore from "./useStore";
import { getStore, setStore } from "./useStore";
import React, { useState } from "react";
import { ReactWidget } from "@jupyterlab/apputils";
import { INotificationStoreObject } from "./index";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import Chips from "./chip";
import SettingsIcon from "@material-ui/icons/Settings";
import { INotification } from "jupyterlab_toastify";
import SubjectAccordion from "./SubjectAccordion";
import { Box } from "@material-ui/core";

export function NotificationCenter(props: any) {
  const [store, setStore] = useStore();
  const [settings, setSettings] = useState(false);

  let onSettingsClick = (e: any) => {
    e.preventDefault();
    setSettings(!settings);
  };

  let handleClick = () => {
    console.log(store);
    setStore({ ...store });
  };

  let deleteSubject = (subject: string) => {
    let store = getStore();
    setStore({
      blockedOrigins: store.blockedOrigins,
      subjectStore: store.subjectStore.filter(
        (subjectObj) => subjectObj.subject !== subject
      ),
    });
  };

  let ignoreOrigin = (origin: string) => {
    let store = getStore();
    if (!store.blockedOrigins.includes(origin)) {
      store.blockedOrigins.push(origin);
      setStore({
        blockedOrigins: store.blockedOrigins,
        subjectStore: store.subjectStore,
      });

      localStorage.setItem(
        "blocked-origins",
        JSON.stringify(store.blockedOrigins)
      );
      void INotification.warning(
        "You will no longer be notified for updates about " +
          origin +
          ". You can always change this in the notification settings.",
        {
          buttons: [
            {
              label: "Settings",
              callback: () => setSettings(true),
            },
          ],
        }
      );
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
          NOTIFICATIONS
        </Typography>
        <IconButton aria-label="settingsCog">
          {/* //style={{ top: 3, right: 3 }}> */}
          <SettingsIcon
            onClick={onSettingsClick}
            //style={{ top: 3, right: 3 }}
          />
        </IconButton>
      </div>
      <div>
        {settings ? (
          <div>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
              Blocked Notifications
            </Typography>
            <FormGroup>
              {store.blockedOrigins.map((origin) => (
                <Chips origin={origin} />
              ))}
            </FormGroup>
          </div>
        ) : (
          <Box display="flex">
            <Box m="auto" width="90%">
              {store.subjectStore.map((notifStoreObj) => (
                <SubjectAccordion
                  notifStoreObj={notifStoreObj}
                  deleteSubject={deleteSubject}
                  ignoreOrigin={ignoreOrigin}
                />
              ))}
            </Box>
          </Box>
        )}
      </div>
      <div>
        <button onClick={() => handleClick()}>Activat Lasers</button>
      </div>
    </div>
  );
}

export function notifyInCenter(
  updatedSubjectStore: INotificationStoreObject[]
): void {
  let store = getStore();
  setStore({
    blockedOrigins: store.blockedOrigins,
    subjectStore: updatedSubjectStore,
  });
}

export class notificationWidget extends ReactWidget {
  constructor() {
    super();
  }
  render(): JSX.Element {
    return (
      <div>
        <NotificationCenter />
      </div>
    );
  }
}
