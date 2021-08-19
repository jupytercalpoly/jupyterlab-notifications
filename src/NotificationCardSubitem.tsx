import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getStore, setStore } from "./useStore";
import IconButton from "@material-ui/core/IconButton";
import ReportOffIcon from "@material-ui/icons/ReportOff";
import ClearIcon from "@material-ui/icons/Clear";
import { Box } from "@material-ui/core";
import { FormatAMPM } from "./FormatAMPM";

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});

export default function NotificationCardSubitem(props: any) {
  let [mouseOver, setMouseOver] = useState(false);

  const classes = useStyles();
  // let openUrl = () => {
  //   const newWindow = window.open(
  //     "https://jupyter.org/",
  //     "_blank",
  //     "noopener,noreferrer"
  //   );
  //   if (newWindow) newWindow.opener = null;
  // };

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
    <Box
      borderTop={1}
      mt={1}
      pt={1}
      onMouseEnter={(e) => {
        setMouseOver(true);
      }}
      onMouseLeave={(e) => {
        setMouseOver(false);
      }}
    >
      <Card elevation={props.elevation}>
        <CardActionArea>
          <CardContent
            classes={{
              root: classes.root,
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <div>
                <Typography gutterBottom variant="body2">
                  {props.origin}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ fontWeight: 500 }}
                  //onClick={() => openUrl()}
                >
                  {props.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ fontWeight: 500 }}
                  //onClick={() => openUrl()}
                >
                  {props.body}
                </Typography>
              </div>
              {mouseOver ? (
                <div>
                  <IconButton aria-label="ignoreOrigin">
                    <ReportOffIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        props.ignoreOrigin(props.origin);
                      }}
                    />
                  </IconButton>
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
                </div>
              ) : (
                <Typography
                  variant="caption"
                  display="block"
                  style={{ fontWeight: 300 }}
                >
                  {FormatAMPM(props.created)}
                </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
