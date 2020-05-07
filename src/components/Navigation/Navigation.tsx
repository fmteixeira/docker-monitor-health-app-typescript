import React, { useState } from "react";
// Components
import Applications from "../Applications/Applications";
import Service from '../Applications/Service/Service';
// Material-UI
import Container from "@material-ui/core/Container";

interface ServInterface {
  serviceName: string;
  appName: string;
}

interface Props {
  handleHeaderTitle: () => void;
}

export default function Navigation(props: Props): JSX.Element {
  const { handleHeaderTitle } = props;
  const [service, setService] = useState<ServInterface>({ appName: "", serviceName: "" });

  const handleServiceClick = (app: string = "", serviceName: string = ""): void => {
    setService({ appName: app, serviceName: serviceName });
  };

  return service.serviceName !== "" ? (
    <Container maxWidth="md">
      <Service appName={service.appName} serviceName={service.serviceName} handleBackButtonClick={handleServiceClick} handleHeaderTitle={handleHeaderTitle} />
    </Container>
  ) : (
      <Container maxWidth="md">
        <Applications handleServiceClick={handleServiceClick} handleHeaderTitle={handleHeaderTitle} />
      </Container>
    );
}