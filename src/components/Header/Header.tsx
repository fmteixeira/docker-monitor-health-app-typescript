import React, { useState } from 'react';
import './Header.css';
// Material-UI
import Grid from '@material-ui/core/Grid';

interface Props {
}

export default function Header(props: Props): JSX.Element {

  return (
    <div className="header">
      <h2 className="app-name">Monitoring App</h2>
      <Grid container spacing={1}>

      </Grid>
    </div>
  );
}
