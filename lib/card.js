import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
    root: {
        maxWidth: 345
    }
});
export default function ImgMediaCard(props) {
    const classes = useStyles();
    return (React.createElement(Card, { className: classes.root },
        React.createElement(CardActionArea, null,
            React.createElement(CardContent, null,
                React.createElement(Typography, { gutterBottom: true, variant: "h5", component: "h2" }, props.title),
                React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p" }, props.body)))));
}
