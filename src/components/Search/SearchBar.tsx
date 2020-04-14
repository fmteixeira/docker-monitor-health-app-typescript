import React, { useState, useEffect } from 'react';

//MaterialUI
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: '0',
      marginBottom: '12',
      margin: theme.spacing(1),
      minWidth: 120,
    },
    inputField: {
      color: 'white',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
    bar: {
       backgroundColor: '#36475F',
    },
    button:{
      backgroundColor: '#36475F',
      color: 'white',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.1),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.1),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '70ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

export default function SearchBar(props:any): JSX.Element {
  const classes = useStyles();


  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.change}
            />

          </div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="status-native-simple" className={classes.inputField}>Status</InputLabel>
            <Select
              className={classes.inputField}
              native
              onChange={props.onChange}
              inputProps={{
                name: 'status',
                id: 'status-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={'all'}>All</option>
              <option value={'healthy'}>Healthy</option>
              <option value={'unhealthy'}>Unhealthy</option>
            </Select>
        </FormControl>
        </Toolbar>
      </AppBar>
    </div>
  );
}