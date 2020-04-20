import React, { useState } from "react";
import "./ApplicationsList.css";
// Material-UI
import Grid from "@material-ui/core/Grid";
// Components
import ApplicationListItem from "./ApplicationListItem/ApplicationListItem";
import SearchBar from "../../Search/SearchBar";
// Interfaces
import {
  ApplicationInterface,
  NotificationStatusInterface,
} from "../../../resources/interfaces";

interface Props {
  applications: Array<ApplicationInterface>;
  notificationState: NotificationStatusInterface;
  handleServiceClick: (app: string, service: string) => void;
}

export default function ApplicationsList(props: Props): JSX.Element {
  const { applications, notificationState, handleServiceClick } = props;
  // State
  const [openAppName, setOpenAppName] = useState("");
  const [search, setSearch] = useState("");

  const handleApplicationClick = (clickedAppName: string): void => {
    setOpenAppName(openAppName !== clickedAppName ? clickedAppName : "");
  };

  function handleChange(event: any) {
    setSearch(event.target.value);
  }

  const [status, setStatus] = useState("");

  const handleSelect = (event: any) => {
    setStatus(event.target.value)
  };

  let filteredApplications;
  filteredApplications = applications.filter(function (
    item: ApplicationInterface
  ) {
    switch (status) {
      case "":
        return item.name.toLowerCase().includes(search.toLowerCase());
        break;
      case "all":
        return item.name.toLowerCase().includes(search.toLowerCase());
        break;
      case "healthy":
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.healthy === true
        );
        break;
      default:
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.healthy === false
        );
    }
  });

  // Get Notification State
  const getNotificationState = (application: ApplicationInterface): boolean => {
    const app = notificationState.apps.find(
      (app) => app.appName === application.name
    );
    return app ? app.isSubscribed : false;
  };

  return (
    <>
      <SearchBar change={handleChange} onChange={handleSelect} />
      <h4 className="title">Applications</h4>
      <Grid container spacing={1}>
        {filteredApplications.map((application: ApplicationInterface) => {
          const shouldOpen = openAppName === application.name ? true : false;
          return (
            <Grid key={application.name} item xs={12}>
              <ApplicationListItem
                application={application}
                open={shouldOpen}
                notificationEnabled={getNotificationState(application)}
                notificationGlobalEnabled={notificationState.global}
                handleApplicationClick={handleApplicationClick}
                handleServiceClick={handleServiceClick}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
