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
import { WithinHour } from "./WithinHour";
import { ExternalHeading } from "./styles";

export function NotificationCenter(props: any) {
  const [store, setStore] = useStore();
  const [settings, setSettings] = useState(false);

  let onSettingsClick = (e: any) => {
    e.preventDefault();
    setSettings(!settings);
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
    <Box display="flex">
      <Box m="auto" width="90%">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" style={ExternalHeading}>
            NOTIFICATIONS
          </Typography>
          <IconButton aria-label="settingsCog">
            <SettingsIcon onClick={onSettingsClick} />
          </IconButton>
        </Box>
        <div>
          {settings ? (
            <div>
              <Typography variant="h6" gutterBottom style={ExternalHeading}>
                Blocked Notifications
              </Typography>
              <FormGroup>
                {store.blockedOrigins.map((origin) => (
                  <Chips origin={origin} />
                ))}
              </FormGroup>
            </div>
          ) : (
            <div>
              <div>
                <Typography variant="h6" style={ExternalHeading}>
                  New
                </Typography>
              </div>
              <div>
                {store.subjectStore.map((notifStoreObj) => (
                  <SubjectAccordion
                    notifStoreObj={{
                      subject: notifStoreObj.subject,
                      notifications: notifStoreObj.notifications.filter(
                        (notif) => WithinHour(notif.created)
                      ),
                    }}
                    deleteSubject={deleteSubject}
                    ignoreOrigin={ignoreOrigin}
                  />
                ))}
              </div>
              <div>
                <Typography variant="h6" style={ExternalHeading}>
                  Earlier
                </Typography>
              </div>
              <div>
                {store.subjectStore.map((notifStoreObj) => (
                  <SubjectAccordion
                    notifStoreObj={{
                      subject: notifStoreObj.subject,
                      notifications: notifStoreObj.notifications.filter(
                        (notif) => !WithinHour(notif.created)
                      ),
                    }}
                    deleteSubject={deleteSubject}
                    ignoreOrigin={ignoreOrigin}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Box>
    </Box>
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
