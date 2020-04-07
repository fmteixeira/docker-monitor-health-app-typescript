import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './ServiceInformation.css';
import { firstLetterToUpperCase } from '../../../../resources/scripts';
// Request
import { getServiceInfo} from '../../../../resources/requests';
// Material-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

interface Props {
  appName: string;
  serviceName: string;
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '0.5rem',
  },
}));

export default function ServiceInformation(props: Props): JSX.Element {
  // State
  const [ service, setService ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const response = JSON.stringify(service, undefined, 2);

  const classes = useStyles();

  useEffect(() => {
    getServiceInfo(props.serviceName, props.serviceName).then(res => {
      if(res) {
        setService(res);
        setLoading(false);
      }
    });
  }, []);

  /*
  NOTA:
  *Código precisa de melhorias dado que os atributos vão ser dinâmicos. 
  O único atributo que pode ser dado como certo é o dos containers.*
  TODO:
  - Mostrada a data de forma legível (adicionar css)
  - Mostrar cada os componentes de forma semelhante à lista de aplicações
  */

  // If Loading
  if (loading) {
    return <p>Not loaded</p>;
  } else {
    let obj = JSON.parse(response);
    let containersArray = obj.containers;
    return (
      <div>
        <h5>Service Information</h5>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                    <Paper className={classes.paper}><b>Server Name:</b> {firstLetterToUpperCase(obj.serverName)}
                    <br></br> 
                    <hr></hr>
                    <b>Expires:</b> {obj.expires}
                    <br></br>
                    <hr></hr>
                    <b>Created:</b> {obj.created}</Paper>
              </Grid>
          </Grid>   
        <div>
          <h5 className="containers">Containers</h5>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {containersArray.map((container:any) => (
                    <Paper className={classes.paper}>{container.names}</Paper>
                  ))} 
              </Grid>
          </Grid>
         </div>
      </div>
    );
  }
}


   