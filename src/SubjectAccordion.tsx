import React from "react";
import ImgMediaCard from "./card";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
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
  expanded: {},
  content: {
    "&$expanded": {
      marginBottom: 0,
    },
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
                          props.deleteSubject(props.notifStoreObj.subject);
                        }}
                        // style={{ top: 3, right: 3 }}
                      />
                    </IconButton>
                  </div>
                }
                labelPlacement="start"
                label={
                  <div>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      style={{ fontWeight: 600 }}
                    >
                      {props.notifStoreObj.subject}
                    </Typography>
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
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary" component={"span"}>
                <Box pl={4}>
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
                </Box>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
}
