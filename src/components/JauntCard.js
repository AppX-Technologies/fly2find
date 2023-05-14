import moment from 'moment/moment';
import React from 'react';
import { Alert, Badge, Button, Card, Col, Dropdown, Image, Row } from 'react-bootstrap';
import { ChevronDown, ChevronUp, Pen, Trash } from 'react-bootstrap-icons/dist';
import { STATUSES } from '../helpers/constants';
import Title from './landing/Title';

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
    <Card className="mb-3">
      <Card.Body className="px-2 py-1">
        <div className="d-flex">
          <div className={`flex-grow-1 pl-2`}>
            {/* Title an Action Buttons */}

            <div className="d-flex align-items-center">
              {/* Title  */}

              <div className="flex-grow-1">
                <h6 className="font-weight-bold xxlarge mt-1"> {jaunt?.title}</h6>
              </div>
              {/* Action Buttons */}

              <div className="d-flex justify-content-evenly align-items-center">
                {isEditable ? (
                  <Dropdown style={styles.smallerFont} className="ml-2">
                    <Dropdown.Toggle variant="success" className="px-1 py-0 " style={{ fontSize: '12px' }}>
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

                <Button size="sm" variant="info" className="ml-2 py-0 px-1" onClick={onEdit}>
                  <Pen style={{ verticalAlign: 'baseline' }} size={10} />
                </Button>
                {isDeletable(jaunt?.id) && (
                  <Button size="sm" variant="danger" className="ml-1 py-0 px-1" onClick={onDelete}>
                    <Trash style={{ verticalAlign: 'baseline' }} size={10} />
                  </Button>
                )}
              </div>
            </div>
            <hr className="my-0" />

            {/* Thumbnail ,Descriptiona and Brief Row */}

            <Row className="my-2">
              {/* Thumbnail Column */}

              <Col md={3} xs={12} className="w-100 d-flex justify-content-center">
                <Image src={jaunt?.thumbnail} className="thumbnail-images " />
              </Col>
              {/* Brief Column */}

              <Col md={9} xs={12}>
                <div>
                  <Alert variant="muted ">
                    <h5 className="large text-dark">{jaunt?.brief}</h5>
                  </Alert>
                </div>
              </Col>
            </Row>
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
