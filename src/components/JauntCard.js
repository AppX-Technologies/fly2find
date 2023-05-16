import React from 'react';
import { Alert, Badge, Button, Card, Col, Dropdown, Image, Row } from 'react-bootstrap';
import { Pen, Trash } from 'react-bootstrap-icons/dist';
import { STATUSES } from '../helpers/constants';

const JauntCard = ({
  updatingStatus,
  status = '',
  jaunt,
  onDelete,
  onEdit,
  editJauntStatus,
  isDeletable,
  isEditable
}) => {
  return (
    <Card className="my-3 p-0 mx-auto">
      <Card.Body className="p-0 position-relative">
        {/* Thumbnail ,Descriptiona and Brief Row */}

        <Image src={jaunt?.thumbnail} className="thumbnail-images mb-1" />

        {/* Action Buttons */}

        <div className="d-flex align-items-center action-buttons">
          <Button size="sm" variant="info" className="py-0 px-1" onClick={onEdit}>
            <Pen style={{ verticalAlign: 'baseline' }} size={10} />
          </Button>
          {isDeletable(jaunt?.id) && (
            <Button size="sm" variant="danger" className="ml-1 py-0 px-1" onClick={onDelete}>
              <Trash style={{ verticalAlign: 'baseline' }} size={10} />
            </Button>
          )}
        </div>

        {/* Title And Brief Row */}
        <div className="px-2">
          {/* Title and status Row */}
          <div className="my-1 d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold xxxlarge mt-1"> {jaunt?.title}</h6>
            {isEditable ? (
              <Dropdown style={styles.smallerFont} className="ml-2">
                <Dropdown.Toggle variant="success" className=" py-0 " style={{ fontSize: '12px' }}>
                  {jaunt?.status}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {STATUSES.map(status => (
                    <Dropdown.Item
                      key={status}
                      value={status}
                      onClick={() => editJauntStatus(jaunt?.id, status)}
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
