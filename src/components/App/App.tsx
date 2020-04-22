import React, {useState} from "react";
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
  
  const [title, setTitle] = useState("Applications");
  const handleClick:any = (appName:string, serviceName:string) => {
    setTitle(appName + " " + serviceName)
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <>
        <Header kc={props.kc} title={title} />
        <Navigation onClick={(appName, serviceName) => handleClick(appName, serviceName)}/>
      </>
    </SnackbarProvider>
  );
}

export default App;
