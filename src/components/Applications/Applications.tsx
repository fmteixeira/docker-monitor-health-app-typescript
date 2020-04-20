import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Requests
import {
  getApplicationNamesList,
  getNotificationInfo,
} from "../../resources/requests";
// Components
import ApplicationsList from "./ApplicationsList/ApplicationsList";
import Service from "./Service/Service";
// Redux
import allActions from "../../redux/actions";
// Interfaces
import {
  ApplicationInterface,
  NotificationStatusInterface,
} from "../../resources/interfaces";

export default function Applications(): JSX.Element {
  /* Applications */

  // Redux
  const applications = useSelector(
    (state: { application: { list: Array<ApplicationInterface> } }) =>
      state.application.list
  );
  const notificationStatus = useSelector(
    (state: {
      application: { notificationStatus: NotificationStatusInterface };
    }) => state.application.notificationStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Set Fetched Applications
    const setApplications = (
      applications: Array<ApplicationInterface>
    ): void => {
      dispatch(allActions.applicationActions.addApplication(applications));
    };

    // Get Applications every 10 seconds
    const appInterval = setInterval(
      (function fetchApplications(): TimerHandler {
        getApplicationNamesList().then((res) => {
          console.log("Fetched Apps: ", res);
          if (res) {
            setApplications(res);
          }
        });
        return fetchApplications;
      })(),
      10000
    );

    return (): void => {
      clearInterval(appInterval);
    };
  }, [dispatch]);

  /* Notifications */
  useEffect(() => {
    // Set Fetched Notification Status
    const setNotificationStatus = (
      notificationStatus: NotificationStatusInterface
    ): void => {
      dispatch(
        allActions.applicationActions.addNotificationStatus(notificationStatus)
      );
    };

    // Get Notification state every 10 seconds
    const notificationInterval = setInterval(
      (function fetchNotificationInfo(): TimerHandler {
        getNotificationInfo().then((res) => {
          console.log("Fetched Notification Status: ", res);
          if (res) {
            setNotificationStatus(res);
          }
        });
        return fetchNotificationInfo;
      })(),
      10000
    );

    return (): void => {
      clearInterval(notificationInterval);
    };
  }, [dispatch]);

  // State
  const defaultServiceState: Array<string> = [];
  const [service, setService] = useState(defaultServiceState);

  const handleServiceClick = (app: string, service: string): void => {
    setService([app, service]);
  };

  return service.length ? (
    <Service appName={service[0]} serviceName={service[1]} />
  ) : (
    <div>
      <ApplicationsList
        applications={applications}
        notificationState={notificationStatus}
        handleServiceClick={handleServiceClick}
      />
    </div>
  );
}
