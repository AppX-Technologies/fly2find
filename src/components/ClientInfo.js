import React, { useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { PersonBadge, PersonSquare } from 'react-bootstrap-icons';

const ClientInfo = () => {
  const [companyName] = useState(localStorage.getItem('user-org-name'));
  const [clientName] = useState(localStorage.getItem('user-name'));
  const [clientPhone] = useState(localStorage.getItem('user-phone'));
  const [clientEmail] = useState(localStorage.getItem('user-email'));

  const InfoElement = ({ name, value }) => {
    return (
      <Col xs={12} md={6} className="my-1">
        <b>{name}: </b> {value}
      </Col>
    );
  };

  return (
    <Alert variant="info">
      <Row>
        <Col xs={2} md={1} className="align-self-center text-center">
          <PersonSquare size={32} />
        </Col>
        <Col xs={10} md={11}>
          <Row className="">
            <InfoElement name="Company Name" value={companyName} />
            <InfoElement name="Client Name" value={clientName} />
            <InfoElement name="Client Phone Number" value={clientPhone} />
            <InfoElement name="Email address" value={clientEmail} />
          </Row>
        </Col>
      </Row>
    </Alert>
  );
};

export default ClientInfo;
