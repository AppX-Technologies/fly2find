import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ArrowDownCircle, ArrowDownCircleFill, CheckCircle, ChevronDown } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Header = ({ headerTitle, headerSubtitle, onLearnMoreClick }) => {
  return (
    <Row style={{ minHeight: '100vh' }} className="h-100 bg-gradient-dark text-white py-5">
      <Col xs={12} md={6} lg={5} className="align-self-center px-5">
        <h1 className="logo mb-4">
          R<span className="underline">atherFly</span>
        </h1>
        <h1>
          <b>{headerTitle}</b>
        </h1>
        <h6>{headerSubtitle}</h6>
        <div className="mt-4 d-flex align-items-center gap-4">
          <Button className="px-3" variant="dark" onClick={onLearnMoreClick}>
            Join Now
            <ArrowDownCircle className="ms-2" size={16} />
          </Button>

          <Link to="/jaunt/finish">
            <Button className="px-3" variant="dark" onClick={onLearnMoreClick}>
              I finished a Mission
              <CheckCircle className="ms-2" size={16} />
            </Button>
          </Link>
        </div>

        <h3 className="mt-5">
          <b>Think Geocaching, but with your aircraft!</b>
        </h3>
      </Col>
      <Col xs={12} md={6} lg={7} className="px-md-0 mt-4 mt-md-0 text-center text-md-right align-self-center">
        <img loading="eager" src={process.env.PUBLIC_URL + '/airplane.png'} height={'100%'} width={'100%'} />
      </Col>
      <Col xs={12} className="text-center mt-2 hover">
        <ArrowDownCircleFill
          onClick={() => {
            document.getElementById('section1').scrollIntoView({ behavior: 'smooth' });
          }}
          size={35}
          className="chevron-animation"
        />
      </Col>
    </Row>
  );
};

export default Header;
