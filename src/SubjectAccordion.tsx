import React, { useState } from "react";
import NotificationCard from "./NotificationCard";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { INotificationStoreObject } from ".";
import { Box } from "@material-ui/core";
import { FormatAMPM } from "./FormatAMPM";

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
    <div>
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
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
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
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ fontWeight: 700 }}
                  >
                    {props.notifStoreObj.subject}
                  </Typography>
                  {expanded ? null : mouseOver ? (
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
                  ) : (
                    <Typography
                      variant="caption"
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
                  <Box pt={1}>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ fontWeight: 400 }}
                    >
                      {props.notifStoreObj.notifications.length - 1} more
                      notifications
                    </Typography>
                  </Box>
                ) : null}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary" component={"span"}>
                {props.notifStoreObj.notifications.map((notif) => (
                  <NotificationCard
                    title={notif.title}
                    body={notif.body}
                    id={notif.notificationId}
                    origin={notif.origin}
                    subject={notif.subject}
                    deleteButton={true}
                    ignoreButton={true}
                    elevation={0}
                    ignoreOrigin={props.ignoreOrigin}
                  ></NotificationCard>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
}
