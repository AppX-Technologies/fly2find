import moment from 'moment';
import React, { useState } from 'react';
import { Badge, Card, Col, Dropdown, Row } from 'react-bootstrap';
import FileDetails from '../FileDetails';
import OverViewColumns from '../OverViewColumns';
import { getVariantFromStatus } from '../../helpers/ui';
import CircularProgressBar from '../circular-progress';
import { toast } from 'react-toastify';
import { makeApiRequests } from '../../helpers/api';
import { isStaff } from '../../helpers/global';
import IndividualServiceTasks from '../tasks/IndividualServiceTasks';
import IndividualServiceNotes from '../notes/IndividualServiceNotes';
import ResetCancellationButton from './ResetCancellationButton';

const commonRows = [
  'Assigned Processor',
  'Estimated Turnaround Time',
  'Hard Cost',
  'Processing Fee',
  'Date Delivered',
  'Needed Date'
];
const commonRowsClient = [
  'Assigned Processor',
  'Estimated Turnaround Time',
  'Total Cost',
  'Date Delivered',
  'Needed Date'
];

const priceFields = ['Hard Cost', 'Total Cost', 'Processing Fee'];
const dateFields = ['Date Delivered', 'Estimated Turnaround Time', 'Needed Date'];

const LienSearchDetails = ({
  lienSearch,
  role,
  statuses = [],
  onStatusUpdate,
  onTaskAddClick,
  onTaskEditClick,
  onTaskStatusUpdate,
  onTaskDelete,
  onNoteAddClick,
  onNoteEditClick,
  onNoteDelete
}) => {
  const [status, setStatus] = useState(lienSearch['Status'] || 'New Order');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const updateStatus = async s => {
    if (status === s) return;
    setUpdatingStatus(true);

    const formData = { lienSearchId: lienSearch['lienSearchId'], Status: s };

    const { response, error } = await makeApiRequests({
      requestType: 'processIndividualService',
      requestBody: { formData, serviceType: 'lienSearch' }
    });
    if (error) {
      toast(error, {
        type: 'error'
      });
      setUpdatingStatus(false);
      return;
    }

    toast(`Status updated successfully!`, {
      type: 'success'
    });

    setStatus(s);
    setUpdatingStatus(false);
    onStatusUpdate && onStatusUpdate(s);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex">
          <div className="flex-grow-1">
            {isStaff(role) && (
              <>
                <h6 className="d-inline-block mb-0 me-2">Status: </h6>
                <Dropdown onClick={e => e.stopPropagation()} className="mb-1 mb-md-0 d-inline-block me-1">
                  <Dropdown.Toggle
                    variant={getVariantFromStatus(status)}
                    disabled={updatingStatus}
                    style={{ border: 0 }}
                    size="sm"
                  >
                    {status}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {statuses.map((s, index) => (
                      <Dropdown.Item
                        className={`bg-${getVariantFromStatus(s)} text-${
                          getVariantFromStatus(s) === 'primary' ? 'dark' : 'white'
                        }`}
                        key={`s-${Math.random()}`}
                        onClick={() => {
                          updateStatus(s);
                        }}
                      >
                        {s}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {updatingStatus && <CircularProgressBar />}
              </>
            )}

            {lienSearch['Cancellation Requested'] && (
              <Badge variant="danger" className="me-1">
                Cancellation Requested
              </Badge>
            )}
            {lienSearch['Rush'] && <Badge variant="danger">Rush</Badge>}
          </div>
          <h6 className="text-muted">
            <span className="text-dark">Date Requested: </span>
            {moment(lienSearch['Date Ordered']).format('MMMM Do, YYYY')}
          </h6>
        </div>
        {!isStaff(role) && <hr className="my-2" />}
        <OverViewColumns
          className="mb-3"
          data={lienSearch}
          fieldsToShow={isStaff(role) ? commonRows : commonRowsClient}
          priceFields={priceFields}
          dateFields={dateFields}
        />
        {lienSearch['Files'] && lienSearch['Files'].length > 0 && <FileDetails files={lienSearch['Files']} />}
        {isStaff(role) && (
          <Row>
            <Col xs={12} md={6}>
              <IndividualServiceTasks
                tasks={lienSearch['tasks']}
                onAddClick={onTaskAddClick}
                onEditClick={onTaskEditClick}
                onStatusUpdate={onTaskStatusUpdate}
                onTaskDelete={onTaskDelete}
              />
            </Col>
            <Col>
              <IndividualServiceNotes
                notes={lienSearch['Notes']}
                onAddClick={onNoteAddClick}
                onEditClick={onNoteEditClick}
                serviceType={'lienSearch'}
                typeId={lienSearch['lienSearchId']}
                onNoteDelete={onNoteDelete}
              />
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default LienSearchDetails;
