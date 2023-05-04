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
  showSteps,
  onShowStepsChange
}) => {
  return (
    <Card className="mb-3">
      <Card.Body className="px-2 py-1">
        <div className="d-flex">
          <div className={`flex-grow-1 pl-2`}>
            {/* Name and Actions */}
            <div className="d-flex">
              <div className="flex-grow-1 d-flex">
                <h6 className="font-weight-bold xxlarge"> {jaunt?.title}</h6>
                <Dropdown style={styles.smallerFont} className="ml-2">
                  <Dropdown.Toggle variant="success" className="p-0">
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
              </div>
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

            {/* Brief Row */}
            <div>
              <h5 className="font-weight-bold xlarge">Brief</h5>

              <h5 className="large ml-3">{jaunt?.brief}</h5>
            </div>

            {/* Description Row */}
            <div>
              <h5 className="font-weight-bold xlarge">Description</h5>

              <h5 className="large ml-3">{jaunt?.description}</h5>
            </div>
            {/* Steps Row */}
            <div className="my-2">
              <h5 className="font-weight-bold xlarge">
                Steps
                {showSteps?.includes(jaunt?.id) ? (
                  <ChevronUp className="pointer ml-2" onClick={() => onShowStepsChange(jaunt?.id)} title="Show Less" />
                ) : (
                  <ChevronDown
                    className="pointer ml-2"
                    onClick={() => onShowStepsChange(jaunt?.id)}
                    title="Show More"
                  />
                )}
              </h5>
              {showSteps.includes(jaunt?.id) && jaunt?.steps?.length === 0 && (
                <span className="large ml-3">No Steps Added Yet.</span>
              )}

              {showSteps.includes(jaunt?.id) &&
                jaunt?.steps &&
                jaunt?.steps.map(step => {
                  return <h6 className="large ml-3">{step?.text}</h6>;
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
