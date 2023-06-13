import React from 'react';
import { Badge, Button, Card, Dropdown } from 'react-bootstrap';
import { PenFill, TrashFill } from 'react-bootstrap-icons/dist';
import { STATUSES } from '../helpers/constants';
import CachedImage from './CachedImage';

const JauntCard = ({ jaunt, onDelete, onEdit, editJauntStatus, isDeletable, isEditable, statusUpdateInProcess }) => {
  return (
    <Card className="p-0 mx-auto jaunt-card h-100" onClick={onEdit}>
      <Card.Body className="p-0 position-relative">
        <CachedImage
          fileId={jaunt?.thumbnail?.fileId}
          className={'thumbnail-images mb-1'}
          renderImageOnClick={false}
          rectangleClassName="rectangular-skeleton-large"
        />

        {/* Action Buttons */}

        <div className="d-flex align-items-center position-relatives">
          <Button size="sm" className="py-0 px-1 jaunt-delete-action-button">
            <PenFill style={{ verticalAlign: 'baseline' }} size={15} className="text-light mt-2" />
          </Button>
          {isDeletable(jaunt?.id) && (
            <Button
              size="sm"
              className="ml-1 py-0 px-1 jaunt-edit-action-button"
              onClick={e => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <TrashFill style={{ verticalAlign: 'baseline' }} size={15} className="text-light mt-2" />
            </Button>
          )}
        </div>

        <div className="px-2">
          {/* Title and status Row */}
          <div className="my-1 d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold xxlarge mt-2"> {jaunt?.title}</h6>
            <div>
              {isEditable ? (
                <Dropdown style={styles.smallerFont} className="ml-2" onClick={e => e.stopPropagation()}>
                  <Dropdown.Toggle
                    variant="success"
                    className=" py-0 "
                    style={{ fontSize: '12px' }}
                    disabled={statusUpdateInProcess[jaunt.id]}
                  >
                    {statusUpdateInProcess[jaunt.id] ? 'Updating...' : jaunt?.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ zIndex: 999999 }}>
                    {STATUSES.map(status => (
                      <Dropdown.Item
                        key={status}
                        value={status}
                        onClick={e => {
                          editJauntStatus(jaunt?.id, status);
                        }}
                        disabled={status === jaunt?.status}
                      >
                        {status}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Badge variant="success">{jaunt?.status}</Badge>
              )}
            </div>
          </div>
          <hr className="m-0" />

          {/* Brief Row */}

          <div className="mt-1 py-2">
            <h5 className="large text-muted lh-lg">{jaunt?.brief}</h5>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const styles = {
  smallFont: {
    fontSize: 14,
    padding: 0
  },
  smallerFont: {
    fontSize: 12
  },
  smallestFont: {
    fontSize: 11
  }
};

export default JauntCard;
