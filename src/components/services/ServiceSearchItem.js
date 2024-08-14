import moment from 'moment';
import React, { useState } from 'react';
import { Badge, Card, Col, Dropdown, Row } from 'react-bootstrap';
import { GearFill } from 'react-bootstrap-icons';
import CircularProgressBar from '../circular-progress';
import ClickableCard from '../ClickableCard';
import { makeApiRequests } from '../../helpers/api';
import { toast } from 'react-toastify';
import { getVariantFromStatus } from '../../helpers/ui';
import { indServiceMetas } from '../../helpers/constants';

const addressFields = ['Property Address', 'City', 'State', 'Zip Code'];

const findIncompleteServices = service => {
  const incompleteServices = [];

  indServiceMetas.forEach(o => {
    if (service[o.key]) {
      o.requiredFields.forEach(f => {
        if (Array.isArray(service[o.key][f]) && service[o.key][f].length === 0) {
          if (!incompleteServices.includes(o.name)) incompleteServices.push(o.name);
        } else {
          if (!service[o.key][f]) {
            if (!incompleteServices.includes(o.name)) incompleteServices.push(o.name);
          }
        }
      });
    }
  });
  return incompleteServices;
};

const ServiceSearchItem = ({ service, onServiceClick, selected, statuses = [], onStatusUpdate, role, fromPicker }) => {
  const [status, setStatus] = useState(service['Status'] || 'Active');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const updateStatus = async s => {
    if (status === s) return;

    if (s === 'Closed') {
      const incompleteServices = findIncompleteServices(service);
      if (incompleteServices.length !== 0) {
        toast.error(
          `All information about ${
            incompleteServices[0]
          } for this service is not complete. Please complete and try again`
        );
        return;
      }
    }

    setUpdatingStatus(true);

    const formData = { serviceId: service['serviceId'], Status: s };

    const { response, error } = await makeApiRequests({
      requestType: 'processService',
      requestBody: { formData }
    });
    if (error) {
      toast(error, {
        type: 'error'
      });
      setUpdatingStatus(false);
      return;
    }

    toast(`Status updated successfully!`, {
      type: 'success'
    });

    setStatus(s);
    setUpdatingStatus(false);
    onStatusUpdate && onStatusUpdate(s, service);
  };

  const getUserDetails = () => {
    if (service['userName'] === 'Accurate Lien Search Staff') {
      return 'Accurate Lien Search';
    }

    return `${service['userName']}(${service['userEmail']})`;
  };

  return (
    <ClickableCard selected={selected} onClick={onServiceClick}>
      <Card>
        <Card.Body className="pb-0">
          <div className="d-flex">
            <div className="text-center mb-3 p-2 rounded">
              <GearFill size={30} />
            </div>

            <div className={`flex-grow-1 ps-4`}>
              <div className="d-flex">
                <div className=" flex-grow-1">
                  <h6 className="d-inline-block me-3 mb-0">
                    {addressFields
                      .map(field => service[field])
                      .filter(value => (value ? value.trim() : false))
                      .join(' ')}
                  </h6>

                  {role === 'Client' || fromPicker ? (
                    <Badge style={styles.smallerFont} variant={getVariantFromStatus(status)}>
                      {service['Status'] || 'Active'}
                    </Badge>
                  ) : (
                    <>
                      <Dropdown onClick={e => e.stopPropagation()} className="mb-1 mb-md-0 d-inline-block me-1">
                        <Dropdown.Toggle
                          variant={getVariantFromStatus(status)}
                          disabled={updatingStatus}
                          style={{ border: 0 }}
                          size="sm"
                        >
                          {status}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {statuses.map((s, index) => (
                            <Dropdown.Item
                              className={`bg-${getVariantFromStatus(s)} text-${
                                getVariantFromStatus(s) === 'primary' ? 'dark' : 'white'
                              }`}
                              key={`s-${Math.random()}`}
                              onClick={() => {
                                updateStatus(s);
                              }}
                            >
                              {s}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {updatingStatus && <CircularProgressBar />}
                    </>
                  )}
                  {service['lienSearch'] && (
                    <Badge style={styles.smallerFont} variant="dark" className="ms-1">
                      Lien Search
                    </Badge>
                  )}
                  {service['estoppel'] && (
                    <Badge style={styles.smallerFont} variant="dark" className="ms-1">
                      Estoppel
                    </Badge>
                  )}
                  {service['survey'] && (
                    <Badge style={styles.smallerFont} variant="dark" className="ms-1">
                      Survey
                    </Badge>
                  )}
                </div>
                <p className="mb-0  text-secondary">
                  <span className="text-dark">Accurate ID: </span>
                  {service['serviceId']}
                </p>
              </div>

              <Row className="mt-1">
                <Col xs={12} md={8}>
                  <p style={styles.smallFont} className="mb-0  text-secondary">
                    <span className="text-dark">Folio #: </span>
                    {service['Folio #'] ? service['Folio #'].join(', ') : 'N/A'}
                  </p>
                </Col>
                <Col xs={12} md={4}>
                  <p style={styles.smallFont} className="mb-0  text-secondary">
                    <span className="text-dark">File Name/Number: </span>
                    {service['File Name/Number'] || 'N/A'}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <p style={styles.smallFont} className="mb-0  text-secondary">
                    <span className="text-dark">Closing Date: </span>
                    {moment(service['Closing Date']).format('MMMM Do YYYY')}
                  </p>
                </Col>

                <Col xs={12} md={4}>
                  <p style={styles.smallFont} className="mb-0  text-secondary">
                    <span className="text-dark">Date Ordered: </span>
                    {moment(service['Date Created']).format('MMMM Do YYYY')}
                  </p>
                </Col>
                <Col xs={12} md={4}>
                  <p style={styles.smallFont} className="mb-0  text-secondary">
                    <span className="text-dark">Organization Name: </span>
                    {service['Organization Name'] || 'N/A'}
                  </p>
                </Col>
              </Row>

              <Row style={styles.smallerFont} className="mt-2 mb-1">
                <Col className="text-right text-muted">
                  <i>Created by {service['userName'] ? getUserDetails() : 'N/A'}</i>
                </Col>
              </Row>
            </div>
          </div>
        </Card.Body>
      </Card>
    </ClickableCard>
  );
};

const styles = {
  smallFont: {
    fontSize: 14
  },
  smallerFont: {
    fontSize: 12
  }
};

export default ServiceSearchItem;
