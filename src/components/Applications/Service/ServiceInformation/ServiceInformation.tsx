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
import { ServiceInterface} from '../../../../resources/interfaces';

//Components 
import ApplicationItemRow from '../../ApplicationsList/ApplicationListItem/ApplicationItemRow/ApplicationItemRow';

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
    borderRadius: '0.3rem',
    backgroundColor: 'white',
    margin: '0.5rem 0',
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
      {props.service.containers.map((container:any) => {
      return <Grid container className={classes.paper}><ApplicationItemRow name={firstLetterToUpperCase(container.names.toString().substring(1,50))}
             healthy={container.healthy}/>
             </Grid>
      })}
    </>
  )
}