import React from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { ArrowRightCircle, StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const finalPoints = [
  `You are moments away from planning your next flight!`,
  `Subscribe for free to get started.`,
  `Expect your first Jaunt in minutes!`,
  `Continue to get new Jaunts by completing the previous Jaunt.`,
  `Currently In beta.`
];

const JoinUs = () => {
  return (
    <Row id="joinUsSection">
      <Col xs={12} md={8} className="align-self-center p-4">
        <Alert variant="primary" className="mb-0 text-white">
          <ul className="mb-0" style={{ listStyleType: 'none' }}>
            {finalPoints.map(p => (
              <li>
                <h5 className="my-2 text-dark">
                  <StarFill className="me-2 mb-1 text-primary2Light" size={18} />
                  {p}
                </h5>
              </li>
            ))}
          </ul>
        </Alert>
      </Col>
      <Col xs={12} md={4} className="align-self-center text-center">
        <div className="my-3">
          <Link to={'/join/pilot'}>
            <Button variant="outline-dark" className="px-5 py-2">
              <h5 className="mb-0">
                Join as a PILOT <ArrowRightCircle className="ms-2" size={20} />
              </h5>
            </Button>
          </Link>
        </div>
        <div className="my-3">
          <Link to={'/join/jaunt'}>
            <Button variant="dark" className="px-5 py-2">
              <h5 className="mb-0">
                Create a JAUNT <ArrowRightCircle className="ms-2" size={20} />
              </h5>
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default JoinUs;
