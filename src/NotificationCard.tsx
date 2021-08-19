import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getStore, setStore } from "./useStore";
import IconButton from "@material-ui/core/IconButton";
import ReportOffIcon from "@material-ui/icons/ReportOff";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});

export default function NotificationCard(props: any) {
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

  return (
    <Card elevation={props.elevation}>
      <CardActionArea>
        <CardContent
          classes={{
            root: classes.root,
          }}
        >
          <Typography gutterBottom variant="body2">
            {props.origin}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontWeight: 500 }}
            onClick={() => openUrl()}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontWeight: 500 }}
            onClick={() => openUrl()}
          >
            {props.body}
          </Typography>
          {props.deleteButton ? (
            <IconButton aria-label="delete" size="small">
              <ClearIcon
                fontSize="small"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  triggerDelete(props.id, props.subject);
                }}
              />
            </IconButton>
          ) : null}
          {props.ignoreButton ? (
            <IconButton aria-label="ignoreOrigin">
              <ReportOffIcon
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  props.ignoreOrigin(props.origin);
                }}
              />
            </IconButton>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
