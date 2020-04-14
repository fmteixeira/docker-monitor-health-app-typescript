import React, { useState } from 'react';
// Components
import ServiceHistory from './ServiceInformation/ServiceHistory';
import Applications from '../Applications';
// Material-UI
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  appName: string;
  serviceName: string;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#455c78',
  },
});

export default function Service(props: Props): JSX.Element {

  const classes = useStyles();
  const [ view, setView ] = useState(false);

  const handleClick = () => {
    setView(true);
  }

  return (view ? (<Applications />)  :
    <>
      <ServiceHistory appName={props.appName} serviceName={props.serviceName}/>
    </>
  );
}
