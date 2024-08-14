import React from 'react';
import { Button } from 'react-bootstrap';
import { Check, Pencil, X } from 'react-bootstrap-icons';
import CircularProgressBar from './circular-progress';

const Heading = ({ title, withEditToggle = false, editMode, onEditClick, onSaveClick, onCancelClick, inProgress }) => {
  return (
    <>
      <div className="d-flex mx-2">
        <div className="flex-grow-1 align-self-center">
          <h6 className="text-dark mb-1">{title}</h6>
        </div>
        {withEditToggle && (
          <div>
            {editMode ? (
              <div className="fade-in">
                <Button disabled={inProgress} size="sm" className="px-2 py-0" variant="danger" onClick={onCancelClick}>
                  <X size={12} />
                  <span className="align-middle ms-2 d-none d-md-inline">Cancel</span>
                </Button>
                <Button
                  disabled={inProgress}
                  size="sm"
                  className="px-2 py-0 ms-2"
                  variant="success"
                  onClick={onSaveClick}
                >
                  <Check size={12} />
                  <span className="align-middle ms-2 d-none d-md-inline">Save</span>
                </Button>
                {inProgress && <CircularProgressBar size={1.5} />}
              </div>
            ) : (
              <Button size="sm" className="px-2 py-0" variant="dark" onClick={onEditClick}>
                <Pencil size={12} />
                <span className="align-middle ms-2">Edit</span>
              </Button>
            )}
          </div>
        )}
      </div>
      <hr className="my-1" />
    </>
  );
};

export default Heading;
