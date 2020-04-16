import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Request
import { getServiceHistory } from '../../../../resources/requests';
// Scripts
import { firstLetterToUpperCase } from '../../../../resources/scripts';
// Components
import Applications from '../../Applications';
import ServiceInformation from './ServiceInformation';
import SearchBar from '../../../Search/SearchBar';
import NavigationBar from '../../../Navigation/NavigationBar/NavigationBar';

// Material-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ServiceInterface, ContainerInterface } from '../../../../resources/interfaces';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


interface Props {
  appName: string;
  serviceName: string;
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#455c78',
  },
  paper: {
    cursor: 'pointer',
    padding: theme.spacing(1),
    margin: '0.5rem',
  },
}));


export default function ServiceHistory(props: Props): JSX.Element {
  // State
  const [ service, setService ] = useState<Array<ServiceInterface> | any>([]);
  const [ loading, setLoading ] = useState(true);
  const [ view, setView ] = useState(false);
  const [ serv, setServ ] = useState<ServiceInterface | any>();
  const [ messageView, setMessageView ] = useState(false);

  useEffect(() => {
    getServiceHistory(props.serviceName, props.serviceName).then(res => {
      if(res) {
        setService(res);
        setLoading(false);
      }
    });
  }, []);

  const response = JSON.stringify(service, undefined, 2);

  const classes = useStyles();

  let obj = JSON.parse(response);

  const handleClick = () => {
    setView(true);
  }

  const handleMessageClick = (service: ServiceInterface) => {
    setServ(service);
    setMessageView(true);
  }

  const checkServiceStatus = (containers: Array<ContainerInterface>) => {
    for (let i = 0; i < containers.length; i++) {
      console.log(JSON.parse(JSON.stringify(containers[i])).healthy);
      if(!JSON.parse(JSON.stringify(containers[i])).healthy) {
        return false;
      };
    };
    return true;
  }
  
  return view ? <Applications /> : messageView ? (<ServiceInformation serviceName={props.serviceName} appName={props.appName} service={serv}/>) : ( loading ? <p>Not loaded</p> :
    <>
      <NavigationBar click={handleClick}/>
      <h5 className="containers">{`${firstLetterToUpperCase(props.appName)} ${firstLetterToUpperCase(props.serviceName)} history:`}</h5>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {obj.map((service: ServiceInterface) => (
            <Paper key={service.created} className={classes.paper} onClick={() => handleMessageClick(service)}>
              {checkServiceStatus(service.containers) ? (
                <IconButton aria-label="delete" className="green-color">
                  <CheckCircleIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton aria-label="delete" className="red-color">
                  <CancelIcon fontSize="small" />
                </IconButton>
              )}
              {service.created}
              {" | Containers: " + service.containers.length}
            </Paper>
          ))} 
        </Grid>
      </Grid>
    </>
  )
}