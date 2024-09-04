import React from 'react';
import { Button, Image, Row, Col, Badge } from 'react-bootstrap';
import { Key } from 'react-bootstrap-icons';
import { render, Value } from 'sass';

export default function PilotViewModal({ userDetails, onEdit }) {
  if (!userDetails) {
    return <p>Loading...</p>;
  }

  const isArray = item => Array.isArray(item);

  const renderFields = () => {
    const { pilotProfile } = userDetails;
    if (!pilotProfile) {
      return <p>No Pilot Data Available</p>;
    }
    return Object.entries(pilotProfile)
      .filter(([, value]) => !Array.isArray(value))
      .map(([key, value]) => (
        <Row key={key} xs={12}>
          <Col xs={6}>
            <div key={key} className="d-flex gap-2">
              <p className="text-capitalize">{`${key}:`}</p>
              <span className="ms-2">{value}</span>
            </div>
          </Col>
        </Row>
      ));
  };

  const renderFieldsAray = () => {
    const { pilotProfile } = userDetails;
    if (!pilotProfile) {
      return <p>No Pilot Data Available</p>;
    }
    return Object.entries(pilotProfile)
      .filter(([, value]) => Array.isArray(value))
      .map(([key, value]) => (
        <Row key={key} xs={12}>
          <Col xs={10}>
            <div key={key} className="d-flex align-items-center gap-2">
              <p className="text-capitalize">{`${key}:`}</p>
              {value.map(item => (
                <Badge
                  className="d-flex justify-content-center align-items-center py-2 px-3"
                  style={{ fontSize: '12px' }}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </Col>
        </Row>
      ));
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center gap-4 px-2">
          <Image src={process.env.PUBLIC_URL + '/user.png'} height={'100px'} />
          <div>
            <h5 className="mb-1">{userDetails?.name}</h5>
            <p className="mb-1">{userDetails?.email}</p>
            <button className="border-rounded background-button py-1 px-2" onClick={onEdit}>
              Edit
            </button>
          </div>
        </div>
        <div className="w-100 px-3 py-4 border-rounded mt-4">
          <div>{renderFields()}</div>
          <div>{renderFieldsAray()}</div>
        </div>
      </div>
    </>
  );
}
