import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ADD_JAUNT_FIELDS } from '../../helpers/forms';
import SlidingSidebar from '../SlidingSideBar/SlidingSideBar';

const AddOrEditJaunt = ({ modalMetaData, onHide, inProgress, onAddOrEditJauntFieldValueChange }) => {
  return (
    <SlidingSidebar visible={modalMetaData !== null} onClose={onHide} title="Add Jaunt Information">
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
                    size="sm"
                    type={type}
                    value={modalMetaData?.[key] || ''}
                    onChange={e => {
                      onAddOrEditJauntFieldValueChange(key, e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            );
          })}
        </Row>
        <Button variant="primary">Add</Button>
      </Container>
    </SlidingSidebar>
  );
};

export default AddOrEditJaunt;
