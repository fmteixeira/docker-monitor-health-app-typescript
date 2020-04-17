import React from "react";
import { SnackbarProvider } from "notistack";
//import { useSelector } from "react-redux";
import "./App.css";
// Components
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";

interface Props {
  kc: any;
}

function App(props: Props): JSX.Element {
  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  return (
    <SnackbarProvider maxSnack={3}>
      <>
        <Header kc={props.kc} />
        <Navigation />
      </>
    </SnackbarProvider>
  );
}

export default App;
