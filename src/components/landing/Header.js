import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ArrowDownCircle, CheckCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Header = ({ headerTitle, headerSubtitle, onLearnMoreClick }) => {
  return (
    <Row style={{ minHeight: '100vh' }} className="h-100 bg-gradient text-white py-5">
      <Col xs={12} md={6} lg={5} className="align-self-center px-5">
        <h1 className="logo mb-4">
          R<span className="underline">atherFly</span>
        </h1>
        <h1>
          <b>{headerTitle}</b>
        </h1>
        <h6>{headerSubtitle}</h6>
        <Row className="mt-4">
          <Col xs={12} md={5}>
            <Button block variant="dark" className="mt-2" onClick={onLearnMoreClick}>
              Join Now
              <ArrowDownCircle className="ml-2" size={16} />
            </Button>
          </Col>
          <Col xs={12} md={7} className="mt-2">
            <Link to="/jaunt/finish">
              <Button block variant="dark" className="ml-0" onClick={onLearnMoreClick}>
                I finished a Jaunt
                <CheckCircle className="ml-2" size={16} />
              </Button>
            </Link>
          </Col>
        </Row>

        <h3 className="mt-5">
          <b>Think Geocaching, but with your aircraft!</b>
        </h3>
      </Col>
      <Col xs={12} md={6} lg={7} className="px-md-0 mt-4 mt-md-0 text-center text-md-right align-self-center">
        <img loading="eager" src={process.env.PUBLIC_URL + '/airplane.png'} height={'100%'} width={'100%'} />
      </Col>
    </Row>
  );
};

export default Header;
