import React from "react";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Material-UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";


interface Props {
  name: string;
  healthy: boolean;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  return (
    <>
      <Grid item xs={6} className="name">
        {firstLetterToUpperCase(props.name)}
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        item
        xs={6}
      >
        {props.healthy ? (
          <IconButton aria-label="delete" className="green-color">
            <FaArrowUp/>
          </IconButton>
        ) : (
          <IconButton aria-label="delete" className="red-color">
            <FaArrowDown />
          </IconButton>
        )}
      </Grid>
    </>
  );
}
