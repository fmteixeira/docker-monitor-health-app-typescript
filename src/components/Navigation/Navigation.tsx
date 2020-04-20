import React, { useState } from "react";
// Components
import Applications from "../Applications/Applications";
import Service from '../Applications/Service/Service';
// Material-UI
import Container from "@material-ui/core/Container";

export default function Navigation(): JSX.Element {
  const defaultServiceState: Array<string> = [];
  const [service, setService] = useState(defaultServiceState);

  const handleServiceClick = (app: string, service: string): void => {
    setService([app, service]);
  };

  return service.length ? (
    <Container maxWidth="md">
      <Service appName={service[0]} serviceName={service[1]} />
    </Container>
  ) : (
      <div>
        <Container maxWidth="md">
          <Applications handleServiceClick={handleServiceClick} />
        </Container>
      </div>
    );
}