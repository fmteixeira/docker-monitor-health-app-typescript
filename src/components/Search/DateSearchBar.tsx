import React, { useState } from "react";
import "./DateSearchBar.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

interface Props {
    change: (event: any) => void;
  }

export default function DateAndTimePickers(props: Props): JSX.Element {
  const classes = useStyles();

  
  return (
    <div className="datePicker">
    <form className={classes.container} noValidate>
      <TextField
        onChange={props.change}
        id="datetime-local"
        label="Date Picker"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
     </div>
  );
}
