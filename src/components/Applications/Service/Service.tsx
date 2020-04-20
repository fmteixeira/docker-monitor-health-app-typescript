import React, { useState } from 'react';
// Components
import ServiceHistory from './ServiceInformation/ServiceHistory';
import ServiceInformation from './ServiceInformation/ServiceInformation';
import NavigationBar from '../../Navigation/NavigationBar/NavigationBar';
import Navigation from '../../Navigation/Navigation';
import Applications from '../Applications';
// Interface
import { ServiceInterface } from '../../../resources/interfaces';

interface Props {
  appName: string;
  serviceName: string;
}

export default function Service(props: Props): JSX.Element {
  const { appName, serviceName } = props;
  const [view, setView] = useState(false);
  const [backButton, setBackButton] = useState(false);
  const [service, setService] = useState<ServiceInterface | any>();

  const handleMessageClick = (service: ServiceInterface): void => {
    setService(service);
    setView(true);
  };

  const handleBackButtonClick = (): void => {
    setBackButton(true);
  }

  return backButton ? <Navigation /> : view ? <ServiceInformation appName={appName} serviceName={serviceName} service={service} /> : (
    <>
      <NavigationBar handleBackButtonClick={handleBackButtonClick} />
      <ServiceHistory appName={appName} serviceName={serviceName} handleMessageClick={handleMessageClick} />
    </>
  );
}