import React, { useCallback, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import PilotForm from '../Form/PilotForm';
import { makeApiRequests, makeRESTApiRequests } from '../../helpers/api';
import { ENDPOINTS } from '../../helpers/constants';
import { toast } from 'react-toastify';
import AppModal from './AppModal';
import PilotViewModal from './PilotViewModal';

export default function PilotProfileModal({
  show,
  onHide,
  initialValue,
  userDetails,
  showProgress,
  onSubmit,
  isEditing
}) {
  const [editMode, setEditMode] = useState(isEditing);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  return (
    <AppModal show={show} onHide={onHide} title={'Pilot Profile'} size={'lg'}>
      {!editMode ? (
        <PilotViewModal userDetails={userDetails} isEditing={isEditing} onEdit={handleEditToggle} />
      ) : (
        <PilotForm initialValue={initialValue} onFormSubmit={onSubmit} />
      )}
    </AppModal>
  );
}
