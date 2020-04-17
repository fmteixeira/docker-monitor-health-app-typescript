import React, { useState, useEffect } from "react";
import "./ServiceHistory.css";

// Request
import { getServiceHistory } from "../../../../resources/requests";
// Scripts
import { firstLetterToUpperCase } from "../../../../resources/scripts";
// Components
import Applications from "../../Applications";
import ServiceInformation from "./ServiceInformation";
import NavigationBar from "../../../Navigation/NavigationBar/NavigationBar";
import ApplicationItemRow from "../../ApplicationsList/ApplicationListItem/ApplicationItemRow/ApplicationItemRow";

// Material-UI
import Grid from "@material-ui/core/Grid";
import {
  ServiceInterface,
  ContainerInterface,
} from "../../../../resources/interfaces";

interface Props {
  appName: string;
  serviceName: string;
}

export default function ServiceHistory(props: Props): JSX.Element {
  // State
  const [service, setService] = useState<Array<ServiceInterface> | any>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);
  const [serv, setServ] = useState<ServiceInterface | any>();
  const [messageView, setMessageView] = useState(false);

  useEffect(() => {
    getServiceHistory(props.serviceName, props.serviceName).then((res) => {
      if (res) {
        setService(res);
        setLoading(false);
      }
    });
  }, []);

  const response = JSON.stringify(service, undefined, 2);

  let obj = JSON.parse(response);

  const handleClick = () => {
    setView(true);
  };

  const handleMessageClick = (service: ServiceInterface) => {
    setServ(service);
    setMessageView(true);
  };

  const checkServiceStatus = (containers: Array<ContainerInterface>) => {
    for (let i = 0; i < containers.length; i++) {
      console.log(JSON.parse(JSON.stringify(containers[i])).healthy);
      if (!JSON.parse(JSON.stringify(containers[i])).healthy) {
        return false;
      }
    }
    return true;
  };

  return view ? (
    <Applications />
  ) : messageView ? (
    <ServiceInformation
      serviceName={props.serviceName}
      appName={props.appName}
      service={serv}
    />
  ) : loading ? (
    <p>Not loaded</p>
  ) : (
    <>
      <NavigationBar click={handleClick} />
      <h5 className="containers">{`${firstLetterToUpperCase(
        props.appName
      )} ${firstLetterToUpperCase(props.serviceName)} history:`}</h5>

      {obj.map((service: ServiceInterface) => {
        let date: string =
          service.created.substr(0, 10) + " " + service.created.substr(11, 8);
        let createdDate = new Date(date);
        return (
          <Grid
            container
            className="message"
            onClick={() => handleMessageClick(service)}
          >
            <ApplicationItemRow
              name={
                createdDate.toLocaleString() +
                " | Containers: " +
                service.containers.length
              }
              healthy={checkServiceStatus(service.containers)}
            />
          </Grid>
        );
      })}
    </>
  );
}
