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
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface Props {
  appName: string;
  serviceName: string;
  handleMessageClick: (service: ServiceInterface) => void;
}

export default function ServiceHistory(props: Props): JSX.Element {
  // State
  const { handleMessageClick, serviceName, appName } = props;
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

  //Checks the messages status
  const checkMessageStatus = (message: any) => {
     for(var i = 0; i < message.containers.length; i++){
       if(!message.containers[i].healthy){
         return message.expires;
       } 
     }
  }

  //Filter the messages according to the status.
  let filteredMessages;
  filteredMessages = obj.filter(function(item:ServiceInterface){
    switch(status){
      case "":
        return item;
        break;
      case "all":
        return item;
        break;
      case "unhealthy":
        return item.expires === checkMessageStatus(item);
        break;
      case "healthy":
        return item.expires != checkMessageStatus(item);
        break;
    }
  })

  const [date, setDate] = useState<MaterialUiPickersDate>();
  const returnVariable = (date: any) => {
    setDate(date._d.toLocaleString());
    console.log(date)
  }

  const [newDate, setNewDate] = useState();
  const handleDateChange = (date: any ) =>{
    setNewDate(date.target.value)
  }
  
  
  // filteredMessages = obj.filter(function(item:ServiceInterface){
  //   if(newDate){
  //     return item.created.substr(0,10) === newDate.substr(0,10)
  //   } else {
  //     return item;
  //   }
  // })

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
        <DateSearchBar onChange={handleSelect} returnVariable={returnVariable} handleDateChange={handleDateChange}/>

        {/* <h5 className="containers">{`${firstLetterToUpperCase(
          appName
        )} ${firstLetterToUpperCase(serviceName)} Messages:`}</h5> */}
        {filteredMessages.map((service: ServiceInterface) => {
          let date: string =
            service.created.substr(0, 10) + " " + service.created.substr(11, 8);
          let createdDate = new Date(date);
          return (
            <Grid
              container
              className="message"
              key={service.created}
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