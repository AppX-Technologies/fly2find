import React from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { RESET_PASSWORD_FIELDS } from '../../helpers/forms';

const ResetPassword = ({
  resetPasswordFormMetadata,
  onResetPasswordFormMetadataChange,
  onHide,
  inProgress,
  onFormSubmit
}) => {
  return (
    <>
      <Modal show={resetPasswordFormMetadata} onHide={onHide} centered backdrop="static">
        <Modal.Header closeButton={!inProgress}>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {RESET_PASSWORD_FIELDS.map(({ key, label, type }) => {
            return (
              <Form.Group className="mb-3" key={key} id={`rp-form-${key}`}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type={type}
                  placeholder={`Enter ${label}`}
                  value={resetPasswordFormMetadata?.[key]}
                  onChange={e => {
                    onResetPasswordFormMetadataChange(key, e.target.value);
                  }}
                />
              </Form.Group>
            );
          })}
          <div className="w-100 d-flex justify-content-center">
            <Button variant="primary" onClick={onFormSubmit} disabled={inProgress}>
              Submit
            </Button>
          </div>
          {inProgress && (
            <ProgressBar variant="dark" animated now={100} label="Resetting Password..." className="mt-2" />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ResetPassword;
