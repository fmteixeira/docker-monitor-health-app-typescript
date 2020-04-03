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
    console.log(props.kc.logout())
  }

  return (
    <>
      <Header 
      name="Afonso" 
      status={firstLetterToUpperCase(props.kc.tokenParsed.preferred_username)}
      logout={logout}
      />
      <Navigation />
    </>
  );
}

export default App;