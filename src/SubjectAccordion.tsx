import React from "react";
import ImgMediaCard from "./card";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { INotificationStoreObject } from ".";

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
  //const [subjectExpanded, setSubjectExpanded] = useState(false);

  const classes = useStyles();

  return (
    <div>
      {!props.notifStoreObj.notifications.length ? null : (
        <div className={classes.root}>
          <Accordion defaultExpanded={false} elevation={2}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ fontWeight: 600 }}
                >
                  {props.notifStoreObj.subject}
                </Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      props.deleteSubject(props.notifStoreObj.subject);
                    }}
                    // style={{ top: 3, right: 3 }}
                  />
                </IconButton>
                <ImgMediaCard
                  title={props.notifStoreObj.notifications[0].title}
                  body={props.notifStoreObj.notifications[0].body}
                  id={props.notifStoreObj.notifications[0].notificationId}
                  origin={props.notifStoreObj.notifications[0].origin}
                  subject={props.notifStoreObj.notifications[0].subject}
                  elevation={0}
                  deleteButton={false}
                  ignoreButton={false}
                ></ImgMediaCard>
                {props.notifStoreObj.notifications.length > 1 ? (
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    style={{ fontWeight: 500 }}
                  >
                    {props.notifStoreObj.notifications.length - 1} more
                    notifications
                  </Typography>
                ) : null}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary" component={"span"}>
                {props.notifStoreObj.notifications.map((notif) => (
                  <ImgMediaCard
                    title={notif.title}
                    body={notif.body}
                    id={notif.notificationId}
                    origin={notif.origin}
                    subject={notif.subject}
                    deleteButton={true}
                    ignoreButton={true}
                    elevation={0}
                    ignoreOrigin={props.ignoreOrigin}
                  ></ImgMediaCard>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
}
