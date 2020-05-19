import React, { useState, useEffect } from "react";
import "./ServiceInformation.css";
//Script
import { firstLetterToUpperCase } from "../../../../resources/scripts";
// Material-UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GetAppIcon from "@material-ui/icons/GetApp";
import FindInPageIcon from "@material-ui/icons/FindInPage";
//Interface
import {
  ServiceInterface,
  ContainerInterface,
} from "../../../../resources/interfaces";
//Components
import JsonHTML from "../../../JsonHTML/JsonHTML";
import NavigationBar from "../../../Navigation/NavigationBar/NavigationBar";
import ServiceContainerList from "./ServiceContainerList/ServiceContainerList";

interface Props {
  appName: string;
  serviceName: string;
  service: ServiceInterface;
  handleBackButtonClick: () => void;
  handleHeaderTitle: (...args: string[]) => void;
  setView: () => void;
}

export default function ServiceInformation(props: Props): JSX.Element {
  const { appName, serviceName, service, handleHeaderTitle, setView } = props;
  const [containerView, setOpenContainerView] = useState(false);
  const [title, setTitle] = useState("Containers");
  const [text, setText] = useState("View all in JSON");
  const [isJson, setIsJson] = useState(false);

  let date: string =
    service.created.substr(0, 10) + " " + service.created.substr(11, 8);
  let serviceCreatedDate = new Date(date).toLocaleString();

  const openAllInJson = () => {
    setIsJson(!isJson);
    setText(
      text === "View all in JSON" ? "View Individually" : "View all in JSON"
    );
  };

  const viewAllInJson = () => {
    let jsonObject = JSON.stringify(service.containers);
    let formattedJson = jsonObject.split(",").join("\n").split("}").join("\n")
    return (
      <div className="container-div">
      <ul className="json-container">
        <li>{formattedJson}</li>
      </ul>
      </div>
    );
  };

  useEffect(() => {
    handleHeaderTitle(
      firstLetterToUpperCase(appName),
      firstLetterToUpperCase(serviceName),
      serviceCreatedDate
    );
  }, [appName, serviceName, serviceCreatedDate, handleHeaderTitle]);

  // Container State
  const [openContainer, setOpenContainer] = useState<ContainerInterface | null>(
    null
  );

  const handleContainerClick = (
    container: ContainerInterface,
    title: string
  ): void => {
    setOpenContainer(container);
    setOpenContainerView(true);
    setTitle(title);
  };

  const setContainerView = () => {
    setOpenContainerView(false);
    setTitle("Containers");
  };

  return (
    <>
      <NavigationBar handleBackButtonClick={setView} />
      <h5 className="service-information-text">Service Information</h5>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className="service-info">
            <h6 className="top-title">
              Server Name: {firstLetterToUpperCase(service.serverName)}
            </h6>
            <h6>Created: {service.created}</h6>
            <h6>Expires: {service.expires}</h6>
          </Paper>
        </Grid>
      </Grid>

      {openContainer && containerView ? (
        <JsonHTML
          title={title}
          json={openContainer}
          closeView={setContainerView}
        />
      ) : (
        <>
          <div className="flex-container">
            <h5>Containers</h5>
            <div>
              <button id="json-button" onClick={openAllInJson}>
                {text}
                <FindInPageIcon fontSize="small" />
              </button>
              <a
                href={URL.createObjectURL(
                  new Blob([JSON.stringify(service.containers, null, 2)], {
                    type: "text/plain",
                  })
                )}
                download={service.appName + "JSON.txt"}
              >
                <button id="download-button">
                  Download All
                  <GetAppIcon fontSize="small" />
                </button>
              </a>
            </div>
          </div>
          {isJson ? (
            viewAllInJson()
          ) : (
            <ServiceContainerList
              service={service}
              handleContainerClick={handleContainerClick}
            />
          )}
        </>
      )}
    </>
  );
}
