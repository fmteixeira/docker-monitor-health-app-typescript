import React, { useState } from "react";
// Components
import Applications from "../Applications/Applications";
import Service from '../Applications/Service/Service';
// Material-UI
import Container from "@material-ui/core/Container";
import Header from "../Header/Header";

interface ServInterface {
  serviceName: string;
  appName: string;
}

interface Props {
  kc: any;
}

export default function Navigation(props: Props): JSX.Element {
  const { kc } = props;
  const [headerTitle, setHeaderTitle] = useState("");
  const [service, setService] = useState<ServInterface>({ appName: "", serviceName: "" });

  const handleServiceClick = (app: string = "", serviceName: string = ""): void => {
    setService({ appName: app, serviceName: serviceName });
  };

  const handleHeaderTitle = (...args: string[]): void => {
    let title: string = "";
    if (args.length === 0) {
      title = "Applications"
    } else {
      title = args.join(" ");
    }
    setHeaderTitle(title);
  }

  return service.serviceName !== "" ? (
    <div>
      <Header kc={kc} title={headerTitle} />
      <Container maxWidth="md">
        <Service appName={service.appName} serviceName={service.serviceName} handleBackButtonClick={handleServiceClick} handleHeaderTitle={handleHeaderTitle} />
      </Container>
    </div>
  ) : (
      <div>
        <Header kc={kc} title={headerTitle} />
        <Container maxWidth="md">
          <Applications handleServiceClick={handleServiceClick} handleHeaderTitle={handleHeaderTitle} />
        </Container>
      </div>
    );
}