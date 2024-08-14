import React, { useState } from 'react';
import SearchService from './services/SearchService';

import { Modal, Button, ProgressBar, Row, Col, Container } from 'react-bootstrap';
import WithAppChoices from '../hooks/WithAppChoices';

const ServicePicker = ({ show, onServicePickerClose, submitting = false, onSubmit, submitButtonText = 'Submit' }) => {
  const [selectedService, setSelectedService] = useState();

  const onServiceSelected = service => {
    setSelectedService(service);
  };

  return (
    <Modal
      dialogClassName="h-100 my-0"
      contentClassName="h-100"
      show={show}
      size="lg"
      onHide={onServicePickerClose}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Select service to be assigned</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-auto">
        <WithAppChoices
          render={appChoices => <SearchService fromPicker onSelect={onServiceSelected} appChoices={appChoices} />}
        />
      </Modal.Body>

      <Modal.Footer>
        <Container fluid>
          <Row>
            {submitting && (
              <Col xs={12}>
                <ProgressBar className="mb-2" now={100} animated label="Claiming request..." />
              </Col>
            )}
            <Col xs={12} className="text-right">
              <Button
                className="me-3"
                size="lg"
                variant="secondary"
                onClick={onServicePickerClose}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                variant="info"
                disabled={!selectedService || submitting}
                onClick={() => onSubmit(selectedService)}
              >
                {submitButtonText}
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ServicePicker;
