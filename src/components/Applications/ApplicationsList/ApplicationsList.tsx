import React, { useState } from 'react';
import './ApplicationsList.css';
// Material-UI
import Grid from '@material-ui/core/Grid';
// Components
import ApplicationListItem from './ApplicationListItem/ApplicationListItem';
import SearchBar from '../../Search/SearchBar';
// Interfaces
import { ApplicationInterface } from '../../../resources/interfaces';

interface Props {
  applications: Array<ApplicationInterface>;
  handleServiceClick: (app: string, service: string) => void;
}

export default function ApplicationsList(props: Props): JSX.Element {
  const [openAppName, setOpenAppName] = useState('');
  const [search, setSearch] = useState('');

  const handleApplicationClick = (clickedAppName: string): void => {
    setOpenAppName(openAppName !== clickedAppName ? clickedAppName : '');
  };

  function handleChange(event:any){
    setSearch(event.target.value)
  };

  const [state, setState] = React.useState<{ status: string | number; name: string }>({
    status: '',
    name: 'hai',
  });

  const handleSelect = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log(event.target.value);
    
  };

  let filteredApplications;
  filteredApplications = props.applications.filter(function(item: ApplicationInterface){
    switch(state.status) {
      case "":
        return item.name.toLowerCase().includes(search.toLowerCase())
        break;
      case "all":
        return item.name.toLowerCase().includes(search.toLowerCase());
        break;
      case "healthy":
        return item.name.toLowerCase().includes(search.toLowerCase()) && item.healthy === true;
        break;
      default:
        return item.name.toLowerCase().includes(search.toLowerCase()) && item.healthy === false;
    }
  })

  return (
    <>
    <SearchBar change={handleChange} onChange={handleSelect}/>
      <h4 className="title">Applications</h4>
      <Grid container spacing={1}>
        {filteredApplications.map((application: ApplicationInterface) => {
          const shouldOpen = (openAppName === application.name) ? true : false;
          return (

            <Grid key={`${application.name}`} item xs={12}>
              <ApplicationListItem application={application} open={shouldOpen} handleApplicationClick={handleApplicationClick} handleServiceClick={props.handleServiceClick}/>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
