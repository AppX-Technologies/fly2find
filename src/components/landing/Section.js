import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Section = ({ texts, flip, id }) => {
  return (
    <>
      <Row id={id} className="p-0">
        {flip ? (
          <>
            <Col xs={11} className="p-5">
              {texts.map(t => (
                <h6 className="py-1" dangerouslySetInnerHTML={{ __html: t }}></h6>
              ))}
            </Col>
            <Col xs={1} className="bg-primaryLight rounded-ff-left"></Col>
          </>
        ) : (
          <>
            <Col xs={1} className="bg-primary2Light rounded-ff-right"></Col>
            <Col xs={11} className="p-5">
              {texts.map(t => (
                <h6 className="py-1" dangerouslySetInnerHTML={{ __html: t }}></h6>
              ))}
            </Col>
          </>
        )}
        <Col xs={12} className="bg-gradient-light" style={{ height: 2 }}></Col>
      </Row>
    </>
  );
};

export default Section;
