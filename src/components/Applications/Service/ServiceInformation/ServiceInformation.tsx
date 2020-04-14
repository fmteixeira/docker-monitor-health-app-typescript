import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './ServiceInformation.css';
import { firstLetterToUpperCase } from '../../../../resources/scripts';
// Request
import { getServiceInfo } from '../../../../resources/requests';
// Material-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ServiceHistory from './ServiceHistory';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import blue from '@material-ui/core/colors/purple';
import { ServiceInterface } from '../../../../resources/interfaces';

const white = blue[50]; // #F44336

interface Props {
  appName: string;
  serviceName: string;
  service: ServiceInterface;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#455c78',
  },
});

const style = {
  color: white,
};

export default function ServiceInformation(props: Props): JSX.Element {
  const classes = useStyles();
  const [ view, setView ] = useState(false);

  const handleClick = () => {
    setView(true);
  }

  return view ? (<ServiceHistory appName={props.appName} serviceName={props.serviceName}/>) : (
    <>
      <Paper className={classes.root}>
      <Grid container >
        <Grid item xs={1}>
          <IconButton onClick={() => handleClick()}>
            <ArrowBackIcon style={style}/>
          </IconButton>
        </Grid>
      </Grid>
      </Paper>

      <h2>{props.service.created}</h2>
    </>
  )
}