import React from 'react';
import Gravatar from 'react-gravatar';
import './Header.css';
import { firstLetterToUpperCase } from '../../resources/scripts';

// Material-UI
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface Props {
    kc: any
}

const style = {
  color: '#F50057',
  padding: '0 1rem',
};

export default function Header(props: Props): JSX.Element {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    console.log("email is: " + props.kc.tokenParsed.email);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <Gravatar email={props.kc.tokenParsed.email} default="monsterid" size={40} className="photo" onClick={handleClick} />
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem style={style} onClick={props.kc.logout}><ExitToAppIcon className="exit-icon"></ExitToAppIcon>Logout</MenuItem>
              </Menu>
            </Grid>
            <Grid item>
              <h6>{props.kc.tokenParsed.email || "User"}</h6>
              <p>{firstLetterToUpperCase(props.kc.tokenParsed.preferred_username)}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}