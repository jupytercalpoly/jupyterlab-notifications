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
    }

    localStorage.setItem("blocked-origins", JSON.stringify(store.blockedOrigins));
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            onClick={() => openUrl()}
          >
            {props.origin}
            {props.body}
          </Typography>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
