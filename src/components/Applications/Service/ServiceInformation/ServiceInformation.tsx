import React, { useState, useEffect } from "react";
import "./ServiceInformation.css";
//Script
import { firstLetterToUpperCase } from "../../../../resources/scripts";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#455c78",
  },
  info: {
    padding: "1rem",
  },
  topTitle: {
    marginTop: "0rem",
  },
});

export default function ServiceInformation(props: Props): JSX.Element {
  const { appName, serviceName, service, handleHeaderTitle, setView } = props;
  const classes = useStyles();

  let date: string =
    service.created.substr(0, 10) + " " + service.created.substr(11, 8);
  let serviceCreatedDate = new Date(date).toLocaleString();

  useEffect(() => {
    handleHeaderTitle(
      firstLetterToUpperCase(appName),
      firstLetterToUpperCase(serviceName),
      serviceCreatedDate
    );
  }, []);

  // Container State
  const [openContainer, setOpenContainer] = useState<ContainerInterface | null>(
    null
  );

  const handleContainerClick = (container: ContainerInterface): void => {
    setOpenContainer(container);
  };

  return (
    <>
      <NavigationBar handleBackButtonClick={setView} />
      <h5>Service Information</h5>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.info}>
            <h6 className={classes.topTitle}>
              Server Name: {firstLetterToUpperCase(service.serverName)}
            </h6>
            <h6>Created: {service.created}</h6>
            <h6>Expires: {service.expires}</h6>
          </Paper>
        </Grid>
      </Grid>

      {openContainer ? (
        <JsonHTML title={"Container"} json={openContainer} />
      ) : (
        <ServiceContainerList
          service={service}
          handleContainerClick={handleContainerClick}
        />
      )}
    </>
  );
}
