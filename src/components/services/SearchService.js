import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NotFound from '../NotFound';
import { useHistory, useLocation } from 'react-router-dom';
import ServiceSearchItem from './ServiceSearchItem';
import SearchBox from './SearchBox';

const SearchService = ({ fromPicker = false, onSelect, appChoices = {}, type, cancelled = false }) => {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  const [statusOptions] = useState(appChoices['Service Status'] || []);
  const [organizationOptions] = useState(appChoices['Organization'] || []);

  const [selectedID, setSelectedID] = useState('');
  const [role] = useState(localStorage.getItem('user-role'));

  const [totalServices, setTotalServices] = useState(0);
  const [indStatusOptions] = useState(appChoices['Individual Service Status'] || []);
  const [activeStatus, setActiveStatus] = useState();

  const getServiceCountLabel = () => {
    const serviceType = type;

    if (serviceType === 'lienSearch') {
      return 'Lien Searches';
    }

    if (serviceType === 'survey') {
      return 'Surveys';
    }

    if (serviceType === 'estoppel') {
      return 'Estoppels';
    }

    return 'Services';
  };

  const updateServiceStatus = (s, service) => {
    const index = services.findIndex(serv => serv['serviceId'] === service['serviceId']);
    if (index !== -1) {
      services[index]['Status'] = s;
      setServices([...services]);
    }
  };

  const onServiceFetch = (services, totalCount) => {
    setServices(services);
    setTotalServices(totalCount);
  };

  return (
    <Container fluid className={'h-100 ' + (fromPicker ? '' : 'py-3 px-md-5 ')}>
      {SearchBox({
        organizationOptions,
        indStatusOptions,
        statusOptions,
        type,
        cancelled,
        onServiceFetch,
        onActiveStatusChange: setActiveStatus,
        onLoadingChange: setLoading
      })}

      <div className="px-md-3">
        {services.length > 0 ? (
          <>
            <Row className="text-right mb-2">
              <Col>
                {cancelled ? 'Cancelled' : 'Total'} {getServiceCountLabel()}:{' '}
                <span className="badge badge-dark">{totalServices}</span>
              </Col>
            </Row>
            {services.map((service, index) => (
              <ServiceSearchItem
                key={`s-${Math.random()}`}
                service={service}
                role={role}
                statuses={statusOptions}
                onServiceClick={() => {
                  if (fromPicker) {
                    setSelectedID(service['serviceId']);
                    onSelect(service);
                  } else {
                    history.push('/services/' + service['serviceId'], {
                      fromPath: `${location.pathname}${activeStatus === 'All' ? '' : `?s=${activeStatus}`}`
                    });
                  }
                }}
                onStatusUpdate={updateServiceStatus}
                selected={service['serviceId'] === selectedID}
                fromPicker={fromPicker}
              />
            ))}
          </>
        ) : (
          !loading && <NotFound text="No services found" />
        )}
      </div>
    </Container>
  );
};

export default SearchService;
