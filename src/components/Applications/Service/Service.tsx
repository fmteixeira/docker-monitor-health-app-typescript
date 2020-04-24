import React, { useState, useEffect } from 'react';
// Components
import ServiceHistory from './ServiceInformation/ServiceHistory';
import ServiceInformation from './ServiceInformation/ServiceInformation';
import NavigationBar from '../../Navigation/NavigationBar/NavigationBar';
import { firstLetterToUpperCase } from '../../../resources/scripts';
// Interface
import { ServiceInterface } from '../../../resources/interfaces';

interface Props {
  appName: string;
  serviceName: string;
  handleBackButtonClick: () => void;
  handleHeaderTitle: (...args: string[]) => void;
}

export default function Service(props: Props): JSX.Element {
  const { appName, serviceName, handleBackButtonClick, handleHeaderTitle } = props;
  const [view, setView] = useState(false);
  const [service, setService] = useState<ServiceInterface | any>();

  const handleMessageClick = (service: ServiceInterface): void => {
    setService(service);
    setView(true);
  };

  useEffect(() => {
    handleHeaderTitle(firstLetterToUpperCase(appName), firstLetterToUpperCase(serviceName), "Messages");
  }, [])

  return view ? <ServiceInformation appName={appName} serviceName={serviceName} service={service} handleBackButtonClick={handleBackButtonClick} handleHeaderTitle={handleHeaderTitle} /> : (
    <>
      <NavigationBar handleBackButtonClick={handleBackButtonClick} />
      <ServiceHistory appName={appName} serviceName={serviceName} handleMessageClick={handleMessageClick} />
    </>
  );
}