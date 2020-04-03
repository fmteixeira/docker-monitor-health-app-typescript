import React, { useState, useEffect } from 'react';
import './ServiceInformation.css';
// Request
import { getServiceInfo} from '../../../../resources/requests';

interface Props {
  appName: string;
  serviceName: string;
}

export default function ServiceInformation(props: Props): JSX.Element {
  // State
  const [ service, setService ] = useState({});
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    getServiceInfo(props.serviceName, props.serviceName).then(res => {
      if(res) {
        setService(res);
        setLoading(false);
      }
    });
  }, []);

  /*
  TODO:
  - Mostrada a data de forma legível (adicionar css)
  - Mostrar cada os componentes de forma semelhante à lista de aplicações
  */

  // If Loading
  if (loading) {
    return <p>Not loaded</p>;
  } else {
    return (
      <>
        <p>Service Information</p>
        <pre>{JSON.stringify(service, undefined, 2)}</pre>
      </>
    );
  }
}
