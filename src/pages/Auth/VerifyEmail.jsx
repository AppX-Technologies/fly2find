import React from 'react';
import { Form } from 'react-bootstrap';

const VerifyEmail = ({ emailToBeVerified, onEmailToBeVerifiedChange }) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={emailToBeVerified}
          onChange={e => onEmailToBeVerifiedChange(e.target.value)}
          autocomplete="off"
        />
      </Form.Group>
    </>
  );
};

export default VerifyEmail;
