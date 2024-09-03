import React, { useCallback } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import PilotForm from '../Form/PilotForm';
import { makeApiRequests, makeRESTApiRequests } from '../../helpers/api';
import { ENDPOINTS } from '../../helpers/constants';
import { toast } from 'react-toastify';
import AppModal from './AppModal';

export default function PilotProfileModal({ show, onHide, initialValue, showProgress, onSubmit }) {
  return (
    <AppModal show={show} onHide={onHide} title={'Pilot Profile'} size={'lg'}>
      <PilotForm editableStatus={initialValue} onFormSubmit={onSubmit} isEditing={true} />
    </AppModal>
  );
}
