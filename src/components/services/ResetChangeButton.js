import React, { useState } from 'react';
import { Button, Col, Modal, Row, ProgressBar } from 'react-bootstrap';
import { ArrowRepeat, Check, X } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { makeApiRequests } from '../../helpers/api';

const ResetChangeButton = ({ service, indServiceType, onReset, onApply }) => {
  const [confirmationModalType, setConfirmationModalType] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const onHide = () => {
    setConfirmationModalType(null);
  };

  const applyAction = async () => {
    setCancelling(true);

    toast(`Please wait change is being ${confirmationModalType === 'reset' ? 'reset' : 'applied'}...`, {
      type: 'info'
    });

    const { response, error } = await makeApiRequests({
      requestType: 'processService',
      requestBody: {
        formData: {
          'New Closing Date': '',
          serviceId: service['serviceId'],
          'Closing Date': confirmationModalType === 'reset' ? undefined : service['New Closing Date']
        }
      }
    });

    if (error) {
      toast(error, {
        type: 'error'
      });
      setCancelling(false);
      return;
    }

    toast(`Change request ${confirmationModalType === 'reset' ? 'reset' : 'applied'} successfully!`, {
      type: 'success'
    });

    setCancelling(false);
    onHide();
    if (confirmationModalType === 'reset') {
      onReset && onReset(service);
    } else {
      onApply && onApply(service);
    }
  };

  const confirmationModal = () => (
    <Modal show={confirmationModalType} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton={!cancelling}>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you really want to {confirmationModalType} this change request?
        {cancelling && (
          <ProgressBar
            variant="dark"
            animated
            now={100}
            label={`${confirmationModalType === 'reset' ? 'Resetting' : 'Applying'} request...`}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col className="text-right">
            <Button variant="secondary" onClick={onHide}>
              No
            </Button>
            <Button className="ms-2" variant="danger" onClick={applyAction}>
              Yes
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <Button variant="outline-info ms-1" size="sm" onClick={() => setConfirmationModalType('reset')}>
        <X className="align-text-bottom me-1" />
        Reset
      </Button>
      <Button variant="outline-info ms-1" size="sm" onClick={() => setConfirmationModalType('apply')}>
        <Check className="align-text-bottom me-1" />
        Apply
      </Button>
      {confirmationModal()}
    </>
  );
};

export default ResetChangeButton;
