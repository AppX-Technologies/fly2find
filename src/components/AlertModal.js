import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import HorizontalProgress from './HorizontalProgress';

const AlertModal = ({
  show,
  onHide,
  onContinueClick,
  onDismissClick,
  alertText,
  dismissButtonText = 'No',
  dismissButtonVariant = 'dark',
  continueButtonText = 'Yes',
  continueButtonVariant = 'danger',
  progressText,
  showProgress,
  size,
  title
}) => (
  <Modal size={size} show={show} onHide={onHide} centered backdrop="static">
    <Modal.Header>
      <Modal.Title>
        <h6 className="mb-0">{title || 'Heads Up!'}</h6>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="overflow-auto">
      <Row>
        <Col className="text-center">
          <ExclamationTriangle className="text-danger" size={30} />
          <h6 className="mt-3"> {alertText} </h6>
        </Col>
      </Row>
      {showProgress && <HorizontalProgress text={progressText} />}
    </Modal.Body>
    <Modal.Footer>
      <Button
        size="sm"
        className="ml-2 px-2"
        variant={dismissButtonVariant}
        onClick={onDismissClick}
        disabled={showProgress}
      >
        {dismissButtonText}
      </Button>
      <Button
        size="sm"
        className="ml-2 px-2"
        variant={continueButtonVariant}
        onClick={onContinueClick}
        disabled={showProgress}
      >
        {continueButtonText}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AlertModal;
