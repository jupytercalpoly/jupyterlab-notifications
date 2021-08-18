import useStore from "./useStore";
import { getStore, setStore } from "./useStore";
import React, { useState } from "react";
import ImgMediaCard from "./card";
import { ReactWidget } from "@jupyterlab/apputils";
import { INotificationStoreObject } from "./index";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Chips from "./chip";
import SettingsIcon from "@material-ui/icons/Settings";
import { INotification } from "jupyterlab_toastify";

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

export function NotificationCenter(props: any) {
  const [store, setStore] = useStore();
  const [settings, setSettings] = useState(false);

  const classes = useStyles();

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
        <IconButton aria-label="settingsCog" style={{ top: 3, right: 3 }}>
          <SettingsIcon
            onClick={onSettingsClick}
            style={{ top: 3, right: 3 }}
          />
        </IconButton>
      </div>
      <div>
        {settings ? (
          <FormGroup>
            {store.blockedOrigins.map((origin) => (
              <Chips origin={origin} />
            ))}
          </FormGroup>
        ) : (
          <div>
            {store.subjectStore.map((obj) => (
              <div>
                {!obj.notifications.length ? null : (
                  <div className={classes.root}>
                    <Accordion defaultExpanded={false}>
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
                            <div>
                              <IconButton aria-label="delete">
                                <DeleteIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    deleteSubject(obj.subject);
                                  }}
                                  style={{ top: 3, right: 3 }}
                                />
                              </IconButton>
                            </div>
                          }
                          labelPlacement="start"
                          label={
                            <div>
                              <Typography variant="h2" gutterBottom>
                                {obj.subject}
                              </Typography>
                              <ImgMediaCard
                                title={obj.notifications[0].title}
                                body={obj.notifications[0].body}
                                id={obj.notifications[0].notificationId}
                                origin={obj.notifications[0].origin}
                                subject={obj.notifications[0].subject}
                                elevation={0}
                                deleteButton={false}
                                ignoreButton={false}
                              ></ImgMediaCard>
                              {obj.notifications.length > 1
                                ? `${
                                    obj.notifications.length - 1
                                  } more notifications`
                                : null}
                            </div>
                          }
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
                                deleteButton={true}
                                ignoreButton={true}
                                elevation={0}
                                ignoreOrigin={ignoreOrigin}
                              ></ImgMediaCard>
                            ))}
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
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
  render() {
    return (
      <div>
        <NotificationCenter />
      </div>
    );
  }
}
