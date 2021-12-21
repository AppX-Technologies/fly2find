import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ArrowDownCircle } from 'react-bootstrap-icons';
import { BRAND_NAME } from '../../helpers/constants';

const Header = ({ headerTitle, headerSubtitle, onLearnMoreClick }) => {
  return (
    <Row className="h-100 bg-gradient text-white py-5">
      <Col xs={12} md={6} lg={5} className="align-self-center px-5">
        <h1 className="logo mb-4">
          F<span className="underline">ly2Find</span>
        </h1>
        <h1>
          <b>{headerTitle}</b>
        </h1>
        <h6>{headerSubtitle}</h6>
        <Button variant="dark" className=" mt-4" onClick={onLearnMoreClick}>
          Join Now
          <ArrowDownCircle className="ml-2" size={16} />
        </Button>
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
