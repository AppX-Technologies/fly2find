import React from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { FORGOT_PASSWORD_FORM_FIELDS } from '../../helpers/forms';

const ForgotPassword = ({
  forgotPassModalMetadata,
  onHide,
  sendingMail,
  onForgotPassFieldValueChange,
  onFormSubmit
}) => {
  return (
    <Modal show={forgotPassModalMetadata} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton={!sendingMail}>
        <Modal.Title>Forgot password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {FORGOT_PASSWORD_FORM_FIELDS.map(({ key, label, type }) => {
          return (
            <Form.Group className="mb-3" key={key} id={`fp-form-${key}`}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={type}
                placeholder={`Enter ${label}`}
                value={forgotPassModalMetadata?.[key]}
                onChange={e => {
                  onForgotPassFieldValueChange(key, e.target.value);
                }}
              />
            </Form.Group>
          );
        })}
        <div className="w-100 d-flex justify-content-center">
          <Button variant="primary" onClick={onFormSubmit} disabled={sendingMail}>
            Submit
          </Button>
        </div>
        {sendingMail && (
          <ProgressBar variant="dark" animated now={100} label="Sending reset email..." className="mt-2" />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
