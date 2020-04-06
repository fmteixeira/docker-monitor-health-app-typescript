import React from 'react';

//import { useSelector } from "react-redux";
import './App.css';
// Components
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';

interface Props {
  kc: any
}

function App(props: Props): JSX.Element {
  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();  

  return (
    <>
      <Header 
      kc={props.kc} 
      />
      <Navigation />
    </>
  );
}

export default App;