import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Image, Modal, Row } from 'react-bootstrap';
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

  useEffect(() => {
    if (!show) {
      setEditMode(false);
    }
  }, [show]);

  const handleEditToggle = () => {
    {
      !isEditing ? setEditMode(!editMode) : setEditMode(editMode);
    }
  };

  return (
    <AppModal show={show} onHide={onHide} title={'Pilot Profile'} size={'lg'}>
      <div className="d-flex align-items-center gap-4 px-2 ">
        <Image src={process.env.PUBLIC_URL + '/user.png'} height={'80px'} />
        <div className="flex-grow-1 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">{userDetails?.name}</h5>
            <p className="mb-1">{userDetails?.email}</p>
          </div>
          <button className="border-rounded background-button py-1 px-2 " onClick={handleEditToggle}>
            {!editMode ? 'Edit' : 'View Profile'}
          </button>
        </div>
      </div>
      <hr />
      {!editMode ? (
        <PilotViewModal userDetails={userDetails} isEditing={isEditing} onEdit={handleEditToggle} />
      ) : (
        <div className="mt-4">
          <PilotForm initialValue={initialValue} onFormSubmit={onSubmit} />
        </div>
      )}
    </AppModal>
  );
}
