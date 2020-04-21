import React, { useState, useEffect } from "react";
import "./ServiceHistory.css";

// Request
import { getServiceHistory } from "../../../../resources/requests";
// Scripts
import { firstLetterToUpperCase } from "../../../../resources/scripts";
// Components
import ServiceItemRow from "./ServiceItemRow/ServiceItemRow";
import DateSearchBar from "../../../Search/DateSearchBar";

// Material-UI
import Grid from "@material-ui/core/Grid";
import {
  ServiceInterface,
  ContainerInterface,
} from "../../../../resources/interfaces";

interface Props {
  appName: string;
  serviceName: string;
  handleMessageClick: (service: ServiceInterface) => void;
}

export default function ServiceHistory(props: Props): JSX.Element {
  // State
  const { handleMessageClick } = props;
  const [service, setService] = useState<Array<ServiceInterface> | any>([]);
  const [loading, setLoading] = useState(true);

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

  
  const [status, setStatus] = useState("");

 
  const handleSelect = (event: any) => {
    setStatus(event.target.value)
  };

  const handleSubmit = (event: any) => {
    console.log("EVENT IS: " + event.target.value)
  }

  let filteredMessages;
  filteredMessages = obj.filter(function (item: ServiceInterface) {
    switch(status){
      case "":
        return item;
        break;
      case "healthy":
        console.log(item)
        return item;
        break;
      case "unhealthy":
        return item;
        break;
      default:
        return item;
    }
  });

  const [date, setDate] = useState(new Date());
  const returnVariable = (date: Date) => { 
    setDate(date);
    console.log(date)
    
  }

  // if(date){
  //   return item.created.substr(0, 10) === date;
  // } else {
  //   return item;
  // }
  

  const checkServiceStatus = (containers: Array<ContainerInterface>) => {
    for (let i = 0; i < containers.length; i++) {
      console.log(JSON.parse(JSON.stringify(containers[i])).healthy);
      if (!JSON.parse(JSON.stringify(containers[i])).healthy) {
        return false;
      }
    }
    return true;
  };

  return loading ? (
    <p>Not loaded</p>
  ) : (
      <>
      <DateSearchBar onChange={handleSelect} returnVariable={returnVariable}/>
      
        <h5 className="containers">{`${firstLetterToUpperCase(
          props.appName
        )} ${firstLetterToUpperCase(props.serviceName)} Messages:`}</h5>
        {filteredMessages.map((service: ServiceInterface) => {
          let date: string =
            service.created.substr(0, 10) + " " + service.created.substr(11, 8);
          let createdDate = new Date(date);
          return (
            <Grid
              container
              className="message"
              onClick={() => handleMessageClick(service)}
            >
              <ServiceItemRow
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