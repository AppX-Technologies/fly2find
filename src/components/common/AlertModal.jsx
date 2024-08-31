import React from 'react';
import { Button } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import HorizontalProgress from '../HorizontalProgress';
import AppModal from './AppModal';

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
  progressText = 'Please wait',
  showProgress,
  size
}) => {
  return (
    <AppModal size={size} show={show} onHide={onHide} title={'Heads up'} showCloseButton={!showProgress}>
      <div className="text-center">
        <ExclamationTriangle className="text-danger" size={30} />
        <h6 className="mt-3"> {alertText} </h6>
      </div>
      {showProgress && <HorizontalProgress text={progressText} />}

      <div className="text-end mt-4">
        <Button
          size="sm"
          className="ms-2 px-2"
          variant={dismissButtonVariant}
          onClick={onDismissClick}
          disabled={showProgress}
        >
          {dismissButtonText}
        </Button>
        <Button
          size="sm"
          className="ms-2 px-2"
          variant={continueButtonVariant}
          onClick={() => onContinueClick()}
          disabled={showProgress}
        >
          {continueButtonText}
        </Button>
      </div>
    </AppModal>
  );
};

export default AlertModal;
