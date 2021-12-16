import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import FormGenerator from '../../form-generator/FormGenerator';
import { pilotForm } from './form';

const Pilot = () => {
  return (
    <Row className="h-100 justify-content-center">
      <Col xs={11} md={9} className="align-self-center py-5">
        <Card>
          <Card.Body>
            <FormGenerator formJson={pilotForm} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Pilot;
