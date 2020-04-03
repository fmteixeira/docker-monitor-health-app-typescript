import React, { useState } from 'react';
import PropTypes from "prop-types";
// Scripts
import { firstLetterToUpperCase } from '../../../resources/scripts';
// Components
import ServiceInformation from './ServiceInformation/ServiceInformation';
import ServiceHistory from './ServiceHistory/ServiceHistory';
import Applications from '../Applications';
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';

interface Props {
  appName: string;
  serviceName: string;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  }
});

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Service(props: Props): JSX.Element {

  /*
  TODO:
  - Adicionar CSS a este componente
  */

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [ view, setView ] = useState(false);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setView(true);
  }

  return view ? (<Applications />) : (
    <div>
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={1}>
            <IconButton onClick={() => handleClick()}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              orientation="horizontal"
              centered
            >
              <Tab label="Containers" {...a11yProps(0)} />
              <Tab label="History" {...a11yProps(1)} />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>
      <h2>
        {firstLetterToUpperCase(props.appName)} -{' '}
        <span>{firstLetterToUpperCase(props.serviceName)}</span>
      </h2>
      <TabPanel value={value} index={0}  >
        <ServiceInformation
        appName={props.appName} serviceName={props.serviceName}
        />
      </TabPanel>
      <TabPanel value={value} index={1} >
        <ServiceHistory />
      </TabPanel>
    </div>
  );
}
