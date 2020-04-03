import React from 'react';
//import { useSelector } from "react-redux";
import './App.css';
// Components
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';

function App(): JSX.Element {
  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  return (
    <>
      <Header/>
      <Navigation />
    </>
  );
}

export default App;
