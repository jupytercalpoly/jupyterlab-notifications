import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getStore, setStore } from "./useStore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportOffIcon from "@material-ui/icons/ReportOff";
import { INotification } from "jupyterlab_toastify";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props: any) {
  const classes = useStyles();
  let openUrl = () => {
    const newWindow = window.open(
      "https://jupyter.org/",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  let triggerDelete = (id: string, subject: string) => {
    let store = getStore();
    const subjectStore = [...store.subjectStore];
    console.log("origin", origin);
    console.log("id", id);
    const o = subjectStore.findIndex((obj) => obj.subject === subject);
    let i = subjectStore[o].notifications.findIndex(
      (task) => task.notificationId === id
    );
    subjectStore[o].notifications.splice(i, 1);

    store.subjectStore = subjectStore;

    setStore(store);
    // localStorage.setItem("originStore", JSON.stringify(store));
    console.log("This was triggered");
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
              callback: () => alert("Action1 was clicked"),
            },
          ],
        }
      );
    }
  };

  return (
    <Card className={classes.root} elevation={props.elevation}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.origin}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            onClick={() => openUrl()}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            onClick={() => openUrl()}
          >
            {props.body}
          </Typography>
          {props.deleteButton ? (
            <IconButton aria-label="delete">
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  triggerDelete(props.id, props.subject);
                }}
                style={{ top: 3, right: 3 }}
              />
            </IconButton>
          ) : null}
          {props.ignoreButton ? (
            <IconButton aria-label="ignoreOrigin">
              <ReportOffIcon
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  ignoreOrigin(props.origin);
                }}
                style={{ top: 3, right: 3 }}
              />
            </IconButton>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
