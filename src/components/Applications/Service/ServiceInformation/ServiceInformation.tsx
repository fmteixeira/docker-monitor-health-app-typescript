import React, { useState } from "react";
import "./ServiceInformation.css";
//Script
import { firstLetterToUpperCase } from "../../../../resources/scripts";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//Interface
import { ServiceInterface } from "../../../../resources/interfaces";

//Components
import ServiceItemRow from "./ServiceItemRow/ServiceItemRow";
import NavigationBar from "../../../Navigation/NavigationBar/NavigationBar";
import Service from "../Service";

interface Props {
  appName: string;
  serviceName: string;
  service: ServiceInterface;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#455c78",
  },
  paper: {
    borderRadius: "0.3rem",
    backgroundColor: "white",
    margin: "0.5rem 0",
  },
  info: {
    padding: "1rem",
  },
  topTitle: {
    marginTop: "0rem",
  },
});

export default function ServiceInformation(props: Props): JSX.Element {
  const { appName, serviceName, service } = props;
  const [backButton, setBackButton] = useState(false);
  const classes = useStyles();

  const handleBackButtonClick = (): void => {
    setBackButton(true);
  }

  return backButton ? <Service appName={appName} serviceName={serviceName} /> : (
    <>
      <NavigationBar handleBackButtonClick={handleBackButtonClick} />
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

      <h5>Containers</h5>
      {service.containers.map((container: any) => {
        return (
          <Grid container className={classes.paper}>
            <ServiceItemRow
              name={firstLetterToUpperCase(
                container.names.toString().substring(1, 50)
              )}
              healthy={container.healthy}
            />
          </Grid>
        );
      })}
    </>
  );
}