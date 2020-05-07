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
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

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
  const [containerView, setOpenContainerView] = useState(false);
  const classes = useStyles();
  const [title, setTitle] = useState("Containers");

  let date: string =
    service.created.substr(0, 10) + " " + service.created.substr(11, 8);
  let serviceCreatedDate = new Date(date).toLocaleString();

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

  const handleContainerClick = (container: ContainerInterface, title: string): void => {
    setOpenContainer(container);
    setOpenContainerView(true);
    setTitle(title);
  };

  const setContainerView = () => {
    setOpenContainerView(false);
    setTitle("Containers");
  }

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

      {openContainer && containerView ? (
        <>
          <IconButton onClick={setContainerView}>
            <CloseIcon />
          </IconButton>
          <JsonHTML title={title} json={openContainer} />
        </>
      ) : (
          <ServiceContainerList
            service={service}
            handleContainerClick={handleContainerClick}
          />
        )}
    </>
  );
}
