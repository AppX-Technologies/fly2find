import moment from 'moment/moment';
import React from 'react';
import { Badge, Button, Card, Dropdown } from 'react-bootstrap';
import { ChevronDown, ChevronUp, Pen, Trash } from 'react-bootstrap-icons/dist';
import { STATUSES } from '../helpers/constants';

const JauntCard = ({
  updatingStatus,
  status = '',
  jaunt,
  fromDetails,
  onDelete,
  onEdit,
  editJauntStatus,
  showSteps
}) => {
  return (
    <Card className="mb-3">
      <Card.Body className="px-2 py-1">
        <div className="d-flex">
          <div className={`flex-grow-1 pl-2`}>
            {/* Name and Actions */}
            <div className="d-flex">
              <div className="flex-grow-1 font-weight-bold xxlarge">{jaunt?.title}</div>
              <div>
                <i style={styles.smallestFont} className="text-secondary">
                  {moment('2023-05-02T08:08:51+0000').format('MMMM Do YYYY')}
                </i>
                <Button size="sm" variant="info" className="ml-2 py-0 px-1" onClick={onEdit}>
                  <Pen style={{ verticalAlign: 'baseline' }} size={10} />
                </Button>
                <Button size="sm" variant="danger" className="ml-1 py-0 px-1" onClick={onDelete}>
                  <Trash style={{ verticalAlign: 'baseline' }} size={10} />
                </Button>
              </div>
            </div>
            <hr className="my-1" />
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                <Badge style={styles.smallerFont} variant="info">
                  {jaunt?.status}
                </Badge>
                {/* Status Dropdown */}
                <Dropdown style={styles.smallerFont} className="ml-2">
                  <Dropdown.Toggle variant="success" className="p-0">
                    Update Status
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {STATUSES.map(status => (
                      <Dropdown.Item key={status} value={status} onClick={() => editJauntStatus(jaunt?.id, status)}>
                        {status}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Breif */}
              <h6>{jaunt?.brief}</h6>
            </div>

            {/* Steps Row */}
            <div className="my-2 ml-2">
              <h5 className="font-weight-bold xlarge">
                Steps {jaunt?.steps?.length === 0 && <span className="small">(No Steps Added Yet.)</span>}
                {showSteps?.includes(jaunt?.id) ? (
                  <ChevronUp className="pointer ml-2" />
                ) : (
                  <ChevronDown className="pointer ml-2" />
                )}
              </h5>
              {showSteps.includes(jaunt?.id) &&
                jaunt?.steps &&
                jaunt?.steps.map(step => {
                  return <h6 className="small ml-2">{step?.text}</h6>;
                })}
            </div>
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
