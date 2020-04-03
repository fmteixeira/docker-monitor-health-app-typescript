import React from 'react';
import './Header.css';

// Material-UI
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

interface Props {
    name: string,
    status: string
}


export default function Header(props: Props): JSX.Element {

  return (
    <div className="header">
      <Grid container 
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={2}>
          <h3 className="app-name">Monitoring App</h3>
        </Grid>
        <Grid item xs={10} >
          <Grid container justify="flex-end" >
            <Grid item>
              <Avatar src="./afonso.jpeg" className="photo"></Avatar>
            </Grid>
            <Grid item>
              <h6>{props.name}</h6>
              <p>{props.status}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}