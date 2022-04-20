import React, { useState } from "react";
import NotificationCard from "./NotificationCard";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { INotificationStoreObject } from ".";
import { FormatAMPM } from "./FormatAMPM";
import NotificationCardSubitem from "./NotificationCardSubitem";
import ReportOffIcon from "@material-ui/icons/ReportOff";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Heading, NotificationSubtext } from "./styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
}));

type AppProps = {
  notifStoreObj: INotificationStoreObject;
  deleteSubject: (subject: string) => void;
  ignoreOrigin: (origin: string) => void;
};

export default function SubjectAccordion(props: AppProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  let [mouseOver, setMouseOver] = useState(false);

  const classes = useStyles();

  return (
    <Box pb={2}>
      {!props.notifStoreObj.notifications.length ? null : (
        <div
          className={classes.root}
          onMouseEnter={(e) => {
            setMouseOver(true);
          }}
          onMouseLeave={(e) => {
            setMouseOver(false);
          }}
        >
          <Accordion
            defaultExpanded={false}
            expanded={
              props.notifStoreObj.notifications.length > 1 ? expanded : false
            }
            onClick={() =>
              setExpanded(
                props.notifStoreObj.notifications.length > 1 ? !expanded : false
              )
            }
            elevation={2}
          >
            <AccordionSummary>
              <div style={{ width: "100%" }}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom sx={Heading}>
                    {props.notifStoreObj.subject}
                  </Typography>
                  {expanded ? null : mouseOver ? (
                    <div>
                      <IconButton aria-label="ignoreOrigin">
                        <ReportOffIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            props.ignoreOrigin(
                              props.notifStoreObj.notifications[0].origin
                            );
                          }}
                        />
                      </IconButton>
                      <IconButton aria-label="delete" size="small">
                        <ClearIcon
                          fontSize="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            props.deleteSubject(props.notifStoreObj.subject);
                          }}
                        />
                      </IconButton>
                    </div>
                  ) : (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      style={{ fontWeight: 300 }}
                    >
                      {FormatAMPM(props.notifStoreObj.notifications[0].created)}
                    </Typography>
                  )}
                </Box>
                {expanded ? null : (
                  <NotificationCard
                    title={props.notifStoreObj.notifications[0].title}
                    body={props.notifStoreObj.notifications[0].body}
                    id={props.notifStoreObj.notifications[0].notificationId}
                    origin={props.notifStoreObj.notifications[0].origin}
                    subject={props.notifStoreObj.notifications[0].subject}
                    elevation={0}
                    deleteButton={false}
                    ignoreButton={false}
                  ></NotificationCard>
                )}
                {expanded ? null : props.notifStoreObj.notifications.length >
                  1 ? (
                  <Typography component="div">
                    <Box pt={1} sx={NotificationSubtext}>
                      {props.notifStoreObj.notifications.length - 1} more
                      notifications
                    </Box>
                  </Typography>
                ) : null}
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: "column" }}>
              <Typography color="textSecondary">
                {props.notifStoreObj.notifications.map((notif) => (
                  <NotificationCardSubitem
                    title={notif.title}
                    body={notif.body}
                    id={notif.notificationId}
                    origin={notif.origin}
                    subject={notif.subject}
                    created={notif.created}
                    deleteButton={true}
                    ignoreButton={true}
                    elevation={0}
                    ignoreOrigin={props.ignoreOrigin}
                  />
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </Box>
  );
}
