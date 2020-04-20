import React, { useState } from 'react';
// Components
import ServiceHistory from './ServiceInformation/ServiceHistory';
import ServiceInformation from './ServiceInformation/ServiceInformation';
import NavigationBar from '../../Navigation/NavigationBar/NavigationBar';
// Interface
import { ServiceInterface } from '../../../resources/interfaces';

interface Props {
  appName: string;
  serviceName: string;
  handleBackButtonClick: () => void;
}

export default function Service(props: Props): JSX.Element {
  const { appName, serviceName, handleBackButtonClick } = props;
  const [view, setView] = useState(false);
  const [service, setService] = useState<ServiceInterface | any>();

  const handleMessageClick = (service: ServiceInterface): void => {
    setService(service);
    setView(true);
  };

  return view ? <ServiceInformation appName={appName} serviceName={serviceName} service={service} handleBackButtonClick={handleBackButtonClick} /> : (
    <>
      <NavigationBar handleBackButtonClick={handleBackButtonClick} />
      <ServiceHistory appName={appName} serviceName={serviceName} handleMessageClick={handleMessageClick} />
    </>
  );
}