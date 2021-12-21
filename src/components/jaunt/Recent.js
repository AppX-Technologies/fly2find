import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { ExclamationOctagon, Hammer } from 'react-bootstrap-icons';

const RecentJaunts = () => {
  return (
    <Row className={`vh-100 justify-content-center`}>
      <Col xs={11} md={9} className="align-self-center py-5">
        <Card>
          <Card.Body>
            <div className="text-center p-3">
              <ExclamationOctagon size={50} className="text-dark" />
              <h5 className="text-primary2 mt-3">This page is under construction</h5>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RecentJaunts;
