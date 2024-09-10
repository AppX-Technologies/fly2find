import React from 'react';
import AppModal from '../../common/AppModal';
import ForgotPasswordForm from '../../Form/ForgotPasswordForm';

const ForgotPasswordModal = ({ show, onHide, onSubmit, forgotPasswordError, showProgress }) => {
  return (
    <AppModal size={'md'} show={show} onHide={onHide} title={'Forgot Password'} showCloseButton={!showProgress}>
      <ForgotPasswordForm errorMessage={forgotPasswordError} showProgress={showProgress} onSubmit={onSubmit} />
    </AppModal>
  );
};

export default ForgotPasswordModal;
