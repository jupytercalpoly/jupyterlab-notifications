import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getStore, setStore } from "./useStore";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { Box } from "@material-ui/core";
import { FormatAMPM } from "./FormatAMPM";
import SettingsIcon from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});

export default function NotificationCardSubitem(props: any) {
  let [mouseOver, setMouseOver] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <Typography gutterBottom variant="body2">
                  {props.origin}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ fontWeight: 500 }}
                >
                  {props.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ fontWeight: 500 }}
                >
                  {props.body}
                </Typography>
              </div>
              {mouseOver ? (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <div>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleClick(e);
                      }}
                    >
                      <SettingsIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleClose();
                          props.ignoreOrigin(props.origin);
                        }}
                      >
                        Block notifications from {props.origin}
                      </MenuItem>
                    </Menu>
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
