import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { setStore, getStore } from "./useStore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});
export default function ImgMediaCard(props) {
    const classes = useStyles();
    let openUrl = () => {
        const newWindow = window.open("https://jupyter.org/", "_blank", "noopener,noreferrer");
        if (newWindow)
            newWindow.opener = null;
    };
    let triggerDelete = (id) => {
        const store = [...getStore().ls];
        let i = store.findIndex((task) => task.id === id);
        store.splice(i, 1);
        setStore({ ls: store });
        console.log("This was triggered");
    };
    return (React.createElement(Card, { className: classes.root },
        React.createElement(CardActionArea, null,
            React.createElement(CardContent, null,
                React.createElement(Typography, { gutterBottom: true, variant: "h5", component: "h2" }, props.title),
                React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", onClick: () => openUrl() }, props.body),
                React.createElement(IconButton, { "aria-label": "delete" },
                    React.createElement(DeleteIcon, { onClick: (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            triggerDelete(props.id);
                        }, style: { top: 3, right: 3 } }))))));
}
