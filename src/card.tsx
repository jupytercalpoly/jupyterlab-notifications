import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import { setStore, getStore } from "./useStore";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props: any) {
  const classes = useStyles();
  let handleClick = () => {
    const newWindow = window.open("https://jupyter.org/", "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <Card className={classes.root} onClick={() => handleClick()}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.body}
          </Typography>
          {/* <button onClick={() => dismiss()}>Dismiss</button> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
