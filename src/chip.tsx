import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { getStore, setStore } from "./useStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

export default function Chips(props: any) {
  const classes = useStyles();

  const handleDelete = (origin: string) => {
    console.info("You clicked the delete icon.");
    let store = getStore();
    const blockedOrigins = [...store.blockedOrigins];
    const o = blockedOrigins.findIndex((originEle) => originEle === origin);
    blockedOrigins.splice(o, 1);
    store.blockedOrigins = blockedOrigins;
    setStore(store);
    localStorage.setItem("blocked-origins", JSON.stringify(blockedOrigins));
  };

  return (
    <div className={classes.root}>
      <Chip
        label={props.origin}
        onDelete={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDelete(props.origin);
        }}
      />
    </div>
  );
}
