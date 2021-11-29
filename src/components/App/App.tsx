import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
//import { useSelector } from "react-redux";
import "./App.css";
// Components
import Navigation from "../Navigation/Navigation";
import { keycloakAPI } from "../../resources/authentication/authentication";
import { showSnackbar } from "../../resources/snackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";

function App(): JSX.Element {
  // Hooks - Snackbar
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    keycloakAPI.setInterceptors(showSnackbar(enqueueSnackbar));
  }, []);

  return (
    <SnackbarProvider maxSnack={3}>
      {/* <Navigation /> */}
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/"} element={<Navigation />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
