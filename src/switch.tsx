import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { getStore, setStore } from "./useStore";

export default function SwitchLabels(props: any) {
  const [state, setState] = React.useState({
    checkedStatus: props.isChecked,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    origin: string
  ) => {
    let store = getStore();
    const blockedOrigins = [...store.blockedOrigins];
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log("state = ", state);
    const isChecked = !state.checkedStatus;
    const b = blockedOrigins.findIndex((originEle) => originEle === origin);
    if (isChecked) {
      if (b === -1) {
        blockedOrigins.push(origin);
      }
    } else {
      if (b !== -1) {
        blockedOrigins.splice(b);
      }
    }
    store.blockedOrigins = blockedOrigins;
    setStore(store);
    localStorage.setItem("blocked-origins", JSON.stringify(blockedOrigins));
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={state.checkedStatus}
          onChange={(e) => {
            handleChange(e, props.origin);
          }}
          name="checkedStatus"
        />
      }
      label={props.origin}
    />
  );
}
