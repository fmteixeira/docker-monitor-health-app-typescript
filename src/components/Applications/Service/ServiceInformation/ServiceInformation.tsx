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
import { ServiceInterface, ContainerInterface } from '../../../../resources/interfaces';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

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
  paper: {
    padding: '0.5rem 1rem',
    margin: '1rem 0',
  },
  info: {
    padding: '1rem',
  },
  topTitle:{
    marginTop: '0rem',
  }
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
      <h5>Service Information</h5>
      <Grid container spacing={3}>    
        <Grid item xs={12}>
            <Paper className={classes.info}>
            <h6 className={classes.topTitle}>Server Name: {firstLetterToUpperCase(props.service.serverName)}</h6>
            <h6>Created: {props.service.created}</h6>
            <h6>Expires: {props.service.expires}</h6>
            </Paper>
        </Grid>
      </Grid>
      <h5>Containers</h5>
      <Grid container spacing={3}>
      <Grid item xs={12}>
      {props.service.containers.map((container:any) => {
         return <Paper className={classes.paper}>{firstLetterToUpperCase(container.names.toString().substring(1,50))}
         {container.healthy ? 
         (<IconButton aria-label="delete" className="green-color">
         <CheckCircleIcon fontSize="small" />
         </IconButton>) : 
         (<IconButton aria-label="delete" className="red-color">
         <CancelIcon fontSize="small" />
         </IconButton>)
       }</Paper>
      })}
       </Grid>
      </Grid>
    </>
  )
}
