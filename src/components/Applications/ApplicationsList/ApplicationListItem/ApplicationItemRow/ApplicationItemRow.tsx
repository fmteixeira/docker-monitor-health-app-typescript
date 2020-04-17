import React from "react";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Components
import NotificationBell from "../../../../Notifications/NotificationBell/NotificationBell";
// Material-UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

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
        {healthy ? (
          <IconButton aria-label="health" className="green-color">
            <CheckCircleIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton aria-label="health" className="red-color">
            <CancelIcon fontSize="small" />
          </IconButton>
        )}
      </Grid>
    </>
  );
}
