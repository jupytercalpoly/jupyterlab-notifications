import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { getStore, setStore } from "./useStore";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { FormatAMPM } from "./FormatAMPM";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});

export default function NotificationCardSubitem(props: any) {
  let [mouseOver, setMouseOver] = useState(false);

  const classes = useStyles();

  let triggerDelete = (id: string, subject: string) => {
    let store = getStore();
    const subjectStore = [...store.subjectStore];
    const o = subjectStore.findIndex((obj) => obj.subject === subject);
    let i = subjectStore[o].notifications.findIndex(
      (task) => task.notificationId === id
    );
    subjectStore[o].notifications.splice(i, 1);

    store.subjectStore = subjectStore;

    setStore(store);
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
                <Typography gutterBottom sx={{fontSize: '1rem', fontWeight: 'bold', lineSpacing: '1.6rem'}}>
                  {props.origin}
                </Typography>
                <Typography 
                  sx={{fontSize: '1rem', fontWeight: 'medium', lineSpacing: '1.2rem'}}
                  // color="textSecondary"
                  component="p"
                >
                  {props.body}
                </Typography>
              </div>
              {mouseOver ? (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <div>
                    <IconButton aria-label="block" size="small">
                      <NotificationsOffIcon 
                        fontSize="small"
                        onClick={(e: { stopPropagation: () => void; preventDefault: () => void; }) => {
                          e.stopPropagation();
                          e.preventDefault();
                          props.ignoreOrigin(props.origin);
                        }}
                      />
                    </IconButton>
                  </div>

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
                </Box>
              ) : (
                <Typography
                  variant="caption"
                  color="textSecondary"
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
