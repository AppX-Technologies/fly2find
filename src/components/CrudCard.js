import moment from 'moment/moment';
import React from 'react';
import { Badge, Button, Card, ProgressBar } from 'react-bootstrap';
import { Calendar2, CheckCircleFill, Circle, Pen, Trash } from 'react-bootstrap-icons/dist';

const CrudCard = ({ updatingStatus, status = '', jaunt, fromDetails }) => {
  return (
    <Card className="mb-3">
      <Card.Body className="px-2 py-1">
        <div className="d-flex">
          <div className={`flex-grow-1 pl-2`}>
            <div className="d-flex">
              <div className="flex-grow-1">
                <Badge style={styles.smallerFont} variant="info">
                  <Calendar2 className="align-text-top mr-1" size={12} />{' '}
                  {moment('2023-05-02T08:08:51+0000').format('MMMM Do YYYY')}
                </Badge>
              </div>
              <div>
                <i style={styles.smallestFont} className="text-secondary">
                  {moment('2023-05-02T08:08:51+0000').format('MMMM Do YYYY')}
                </i>
                <Button size="sm" variant="info" className="ml-2 py-0 px-1">
                  <Pen style={{ verticalAlign: 'baseline' }} size={10} />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="ml-1 py-0 px-1"
                  //   onClick={() => setShowConfirmationModal({ type: 'delete' })}
                >
                  <Trash style={{ verticalAlign: 'baseline' }} size={10} />
                </Button>
              </div>
            </div>
            <hr className="my-1" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const styles = {
  smallFont: {
    fontSize: 14
  },
  smallerFont: {
    fontSize: 12
  },
  smallestFont: {
    fontSize: 11
  }
};

export default CrudCard;
