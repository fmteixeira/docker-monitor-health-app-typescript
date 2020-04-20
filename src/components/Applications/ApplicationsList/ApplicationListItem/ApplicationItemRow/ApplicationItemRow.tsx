import React from "react";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Components
import NotificationBell from "../../../../Notifications/NotificationBell/NotificationBell";
// Material-UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  name: string;
  healthy: boolean;
  notificationEnabled?: boolean;
  notificationGlobalEnabled: boolean;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  const {
    name,
    healthy,
    notificationEnabled,
    notificationGlobalEnabled,
  } = props;
  return (
    <>
      <Grid item xs={6} className="name">
        {firstLetterToUpperCase(name)}
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        item
        xs={6}
      >
        {notificationGlobalEnabled ? (
          <NotificationBell
            applicationName={name}
            notificationEnabled={true}
            notificationGlobalEnabled={notificationGlobalEnabled}
          />
        ) : notificationEnabled !== undefined ? (
          <NotificationBell
            applicationName={name}
            notificationEnabled={notificationEnabled}
            notificationGlobalEnabled={notificationGlobalEnabled}
          />
        ) : null}
        {props.healthy ? (
          <IconButton aria-label="delete" className="green-color">
            <FaArrowUp />
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
