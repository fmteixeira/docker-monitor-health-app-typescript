import React, { useState } from 'react';
import './Header.css';
// Material-UI

import Grid from '@material-ui/core/Grid';

interface Props {
}


export default function Header(props: Props): JSX.Element {

  return (
   <div>
        <div className="header">
            <div className="app-name">
                 <h2>Monitoring App</h2>
            </div>
            <div className="photo-container">
                <img src="./afonso.jpeg" className="photo"></img> 
            </div>
            <div className="text">
                <h6>Afonso</h6>
                <p>Admin</p>
            </div>
        </div>
  </div>   
  );
}
