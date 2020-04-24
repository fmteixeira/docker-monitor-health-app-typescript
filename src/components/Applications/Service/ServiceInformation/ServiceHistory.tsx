import React, { useState, useEffect } from "react";
import "./ServiceHistory.css";

// Request
import { getServiceHistory } from "../../../../resources/requests";

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
  const { handleMessageClick, appName, serviceName } = props;
  const [service, setService] = useState<Array<ServiceInterface> | any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServiceHistory(serviceName, serviceName).then((res) => {
      if (res) {
        setService(res);
        setLoading(false);
      }
    });
  }, []);

  const response = JSON.stringify(service, undefined, 2);

  let messages = JSON.parse(response);

  //Sets the date selected by the user.
  const [selectedDate, setSelectedDate] = useState<any | null>();
  const handleDateChange = (date: any) => {
    setSelectedDate(date ? date.substr(0, 10) : date);
  };

  //Converts 12h time to 24h time.
  const convertTime12to24 = (time12h: any | null) => {
    if(!time12h){
      return null;
    }

    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  //Sets the hour selected by the user.
  const [selectedHour, setSelectedHour] = useState<any | null>();
  const handleHourChange = (hour: any) => {
    setSelectedHour(convertTime12to24(hour));
  };

  //Checks if the message is healthy or unhealthy and returns the message created date.
  const checkMessageStatus = (message: any) => {
    for (var i = 0; i < message.containers.length; i++) {
      if (!message.containers[i].healthy) {
        return message.created;
      }
    }
  };

  //Sets the status to the one chosen by the user.
  const [status, setStatus] = useState("");
  const handleSelect = (event: any) => {
    setStatus(event.target.value);
  };

  //Filters the messages according to the status and date choosen by the user.
  let filteredMessages = messages.filter(function (message: ServiceInterface) {
    let messageCreatedDate = message.created.substr(0, 10);
    let messageCreatedHour = message.created.substr(11, 5);
    switch (status) {
      case "all":
        if (selectedDate && selectedHour) {
          return (
            messageCreatedDate === selectedDate &&
            messageCreatedHour === selectedHour
          );
        } else if (selectedDate || selectedHour) {
          return (
            messageCreatedDate === selectedDate ||
            messageCreatedHour === selectedHour
          );
        } else {
          return message;
        }
      case "unhealthy":
        if (selectedDate && selectedHour) {
          return (
            messageCreatedDate === selectedDate &&
            messageCreatedHour === selectedHour &&
            message.created === checkMessageStatus(message)
          );
        } else if (selectedDate || selectedHour) {
          return (
            (messageCreatedDate === selectedDate &&
              message.created === checkMessageStatus(message)) ||
            (messageCreatedHour === selectedHour &&
              message.created === checkMessageStatus(message))
          );
        } else {
          return message.created === checkMessageStatus(message);
        }
      case "healthy":
        if (selectedDate && selectedHour) {
          return (
            messageCreatedDate === selectedDate &&
            messageCreatedHour === selectedHour &&
            message.created !== checkMessageStatus(message)
          );
        } else if (selectedDate || selectedHour) {
          return (
            (messageCreatedDate === selectedDate &&
              message.created !== checkMessageStatus(message)) ||
            (messageCreatedHour === selectedHour &&
              message.created !== checkMessageStatus(message))
          );
        } else {
          return message.created !== checkMessageStatus(message);
        }
      default:
        return message;
    }
  });

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
      <DateSearchBar
        onChange={handleSelect}
        onDateChange={handleDateChange}
        onHourChange={handleHourChange}
      />

      {/* <h5 className="containers">{`${firstLetterToUpperCase(
          appName
        )} ${firstLetterToUpperCase(serviceName)} Messages:`}</h5> */}
      {filteredMessages.map((service: ServiceInterface, index: number) => {
        let date: string =
          service.created.substr(0, 10) + " " + service.created.substr(11, 8);
        let createdDate = new Date(date);
        return (
          <Grid
            container
            key={index}
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
