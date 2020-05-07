import React, { useState } from "react";
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
  const { kc } = props;
  const [headerTitle, setHeaderTitle] = useState("");

  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  const handleTitleChange = (...args: string[]): void => {
    let title: string = "";
    if (args.length === 0) {
      title = "Applications"
    } else {
      title = args.join(" ");
    }
    setHeaderTitle(title);
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <>
        <Header kc={kc} title={headerTitle} />
        <Navigation handleHeaderTitle={handleTitleChange} />
      </>
    </SnackbarProvider>
  );
}

export default App;
