import React from 'react';
import { Col, Container, Form, Modal, ProgressBar, Row } from 'react-bootstrap';
import { ADD_JAUNT_FIELDS } from '../../helpers/forms';

const AddJaunt = ({ modalMetaData, onHide, inProgress, onAddJauntFieldValueChanges }) => {
  return (
    <Modal show={modalMetaData !== null} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header closeButton className="p-3">
        <h5 className="xxlarge mb-0">Add Jaunt Information</h5>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {ADD_JAUNT_FIELDS.map(({ key, label, type, columns, notRequired }) => {
              return (
                <Col md={columns || 6} xs={12}>
                  <Form.Group className="mb-3" key={key} id={`fp-form-${key}`}>
                    <Form.Label>
                      {label}
                      {!notRequired && <sup className="text-primary">*</sup>}
                    </Form.Label>
                    <Form.Control
                      type={type}
                      value={modalMetaData?.[key]}
                      onChange={e => {
                        onAddJauntFieldValueChanges(key, e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              );
            })}
          </Row>
        </Container>
        <div className="w-100 d-flex justify-content-center">
          {/* <Button variant="primary" onClick={onFormSubmit} disabled={sendingMail}>
            Submit
          </Button> */}
        </div>
        {inProgress && (
          <ProgressBar variant="dark" animated now={100} label="Sending reset email..." className="mt-2" />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddJaunt;
