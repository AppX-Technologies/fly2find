import React, { useState } from 'react';
import { Button, Col, Modal, Row, ProgressBar } from 'react-bootstrap';
import { ArrowRepeat } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { makeApiRequests } from '../../helpers/api';

const ResetCancellationButton = ({ service, indServiceType, onReset }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const onHide = () => {
    setShowConfirmationModal(false);
  };

  const resetCancellation = async () => {
    setCancelling(true);

    toast(`Please wait cancellation is being reset...`, {
      type: 'info'
    });

    const { response, error } = await makeApiRequests({
      requestType: 'processIndividualService',
      requestBody: {
        formData: {
          'Cancellation Requested': false,
          serviceId: service['serviceId'],
          [`${indServiceType}Id`]: service[indServiceType][`${indServiceType}Id`]
        },
        serviceType: indServiceType
      }
    });

    if (error) {
      toast(error, {
        type: 'error'
      });
      setCancelling(false);
      return;
    }

    toast(`Cancellation reset successfully!`, {
      type: 'success'
    });

    setCancelling(false);
    onHide();
    onReset && onReset(service, indServiceType);
  };

  const confirmationModal = () => (
    <Modal show={showConfirmationModal} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton={!cancelling}>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you really want to reset this cancellation request?
        {cancelling && <ProgressBar variant="dark" animated now={100} label="Resetting request..." />}
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col className="text-right">
            <Button variant="secondary" onClick={onHide}>
              No
            </Button>
            <Button className="ms-2" variant="danger" onClick={resetCancellation}>
              Yes
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <Button variant="outline-danger ms-1" size="sm" onClick={() => setShowConfirmationModal(true)}>
        Reset Cancellation
        <ArrowRepeat className="align-text-bottom ms-1" />
      </Button>
      {confirmationModal()}
    </>
  );
};

export default ResetCancellationButton;
