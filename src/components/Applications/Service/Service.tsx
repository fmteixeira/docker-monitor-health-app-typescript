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
  handleHeaderTitle: (...args: string[]) => void;
  handleCurrentComp: (currentComp: string) => void;
}

export default function Service(props: Props): JSX.Element {
  const { appName, serviceName, handleBackButtonClick, handleHeaderTitle, handleCurrentComp } = props;
  const [view, setView] = useState(false);
  const [service, setService] = useState<ServiceInterface | any>();

  const handleMessageClick = (service: ServiceInterface): void => {
    setService(service);
    setView(true);
  };

  const controllView = (): void => {
    setView(false);
  };

  return view ? <ServiceInformation appName={appName} serviceName={serviceName} service={service} handleHeaderTitle={handleHeaderTitle}
    setView={controllView} handleCurrentComp={handleCurrentComp} /> : (
      <>
        <NavigationBar handleBackButtonClick={handleBackButtonClick} />
        <ServiceHistory appName={appName} serviceName={serviceName} handleHeaderTitle={handleHeaderTitle} handleMessageClick={handleMessageClick}
          handleCurrentComp={handleCurrentComp} />
      </>
    );
}