import useStore from "./useStore";
import { getStore, setStore } from "./useStore";
import React, { useState } from "react";
import ImgMediaCard from "./card";
import { ReactWidget } from "@jupyterlab/apputils";
import { INotificationStoreObject } from "./index";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SwitchLabels from "./switch";
import FormGroup from "@material-ui/core/FormGroup";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  expanded: {},
  content: {
    "&$expanded": {
      marginBottom: 0,
    },
  },
}));

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
  const [settings, setSettings] = useState(false);

  const classes = useStyles();

  let onSettingsClick = (e: any) => {
    e.preventDefault();
    setSettings(!settings);
  };

  // let onOriginClick = (e: any) => {
  //   e.preventDefault();
  //   console.log("origin clicked");
  // };

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
      <div>
        <button type="button" onClick={onSettingsClick}>
          Settings
        </button>
      </div>
      <div>
        {settings ? (
          <FormGroup>
            {store.originList.map((origin) => (
              <SwitchLabels
                origin={origin}
                isChecked={store.blockedOrigins.includes(origin)}
              />
            ))}
          </FormGroup>
        ) : (
          <div>
            {store.subjectStore.map((obj) => (
              <div className={classes.root}>
                {/* bool defaultExpanded below controls default state of accordion */}
                <Accordion defaultExpanded={true} elevation={0}>
                  <AccordionSummary
                    classes={{
                      content: classes.content,
                      expanded: classes.expanded,
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    <FormControlLabel
                      aria-label="Acknowledge"
                      onClick={(event) => event.stopPropagation()}
                      onFocus={(event) => event.stopPropagation()}
                      control={
                        <Checkbox
                          checked={false}
                          //id={task.id.toString()}
                          //onChange={toggleTask}
                        />
                      }
                      label={<div>{obj.subject}</div>}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="textSecondary" component={"span"}>
                      <Box pl={4}>
                        {obj.notifications.map((notif) => (
                          <ImgMediaCard
                            title={notif.title}
                            body={notif.body}
                            id={notif.notificationId}
                            origin={notif.origin}
                            subject={notif.subject}
                          >
                            {/* control={ */}
                          </ImgMediaCard>
                        ))}
                      </Box>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={() => handleClick()}>Activat Lasers</button>
    </div>
  );
}

export function notifyInCenter(
  updatedSubjectStore: INotificationStoreObject[],
  updatedOriginList: string[]
): void {
  let store = getStore();
  setStore({
    blockedOrigins: store.blockedOrigins,
    subjectStore: updatedSubjectStore,
    originList: updatedOriginList,
  });
}

// export function blockOrigin(origin: string): void {
//   let localBlockedOrigin = JSON.parse(localStorage.getItem("blocked-origins")!);
//   localBlockedOrigin.push(origin);
//   localStorage.setItem("blocked-origins", JSON.stringify(localBlockedOrigin));

//   let store = getStore();
//   store.blockedOrigins.push(origin);
//   setStore({
//     blockedOrigins: store.blockedOrigins,
//     originStore: store.originStore,
//   });
// }

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
