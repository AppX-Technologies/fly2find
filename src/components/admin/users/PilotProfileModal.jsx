import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import PilotForm from '../../Form/PilotForm';
import AppModal from '../../common/AppModal';
import PilotViewModal from '../../common/PilotDetailCard';

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
          <Button
            className="py-1 px-2 d-flex align-items-center gap-2"
            variant="info"
            size="sm"
            onClick={handleEditToggle}
          >
            {!editMode ? (
              <>
                <Pencil size={15} /> Edit
              </>
            ) : (
              'View Profile'
            )}
          </Button>
        </div>
      </div>
      <hr />
      {!editMode ? (
        <PilotViewModal userDetails={userDetails} isEditing={isEditing} onEdit={handleEditToggle} />
      ) : (
        <div className="mt-4">
          <PilotForm initialValue={initialValue} onFormSubmit={onSubmit} showProgress={showProgress} />
        </div>
      )}
    </AppModal>
  );
}
