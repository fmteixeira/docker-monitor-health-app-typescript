import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Material-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import blue from '@material-ui/core/colors/purple';


const white = blue[50]; // #F44336

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#455c78',
  },
});

const style = {
    color: white,
  };
  
export default function NavigationBar(props: any): JSX.Element {
    const classes = useStyles();
    const [ view, setView ] = useState(false);

    const handleClick = () => {
        setView(true);
    }
    
  return(
  <div>
      <Paper className={classes.root}>
      <Grid container >
        <Grid item xs={1}>
          <IconButton onClick={props.click}>
            <ArrowBackIcon style={style}/>
          </IconButton>
        </Grid>
      </Grid>
      </Paper>
   </div>
)}