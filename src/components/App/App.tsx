import React from 'react';
import { firstLetterToUpperCase } from '../../resources/scripts';
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

  const logout = () => {

  }

  return (
    <>
      <Header name="Afonso" 
      status={firstLetterToUpperCase(props.kc.tokenParsed.preferred_username)
      }/>
      <Navigation />
    </>
  );
}

export default App;