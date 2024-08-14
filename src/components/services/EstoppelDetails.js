import moment from 'moment';
import React, { useState } from 'react';
import { Alert, Badge, Card, Col, Dropdown, Row } from 'react-bootstrap';
import FileDetails from '../FileDetails';
import OverViewColumns from '../OverViewColumns';
import { getVariantFromStatus } from '../../helpers/ui';
import CircularProgressBar from '../circular-progress';
import { toast } from 'react-toastify';
import { makeApiRequests } from '../../helpers/api';
import { isStaff } from '../../helpers/global';
import IndividualServiceTasks from '../tasks/IndividualServiceTasks';
import IndividualServiceNotes from '../notes/IndividualServiceNotes';

export const commonEstoppelFields = [
  'Assigned Processor',
  'Hard Cost',
  'Turnaround Time',
  'Needed Date',
  'Processing Fee'
];
const commonRowsClient = ['Assigned Processor', 'Total Cost', 'Turnaround Time', 'Needed Date'];
const priceFields = ['Hard Cost', 'Total Cost', 'Processing Fee'];
const hoaS = ['HOA 1 Info', 'HOA 2 Info', 'HOA 3 Info'];
const dateFields = ['Turnaround Time', 'Needed Date'];

const EstoppelDetails = ({
  estoppel,
  role,
  statuses = [],
  onStatusUpdate,
  onTaskAddClick,
  onTaskEditClick,
  onTaskStatusUpdate,
  onTaskDelete,
  onNoteDelete,
  onNoteAddClick,
  onNoteEditClick
}) => {
  const [status, setStatus] = useState(estoppel['Status'] || 'New Order');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const updateStatus = async s => {
    if (status === s) return;
    setUpdatingStatus(true);

    const formData = { estoppelId: estoppel['estoppelId'], Status: s };

    const { response, error } = await makeApiRequests({
      requestType: 'processIndividualService',
      requestBody: { formData, serviceType: 'estoppel' }
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

            {estoppel['Cancellation Requested'] && (
              <Badge variant="danger" className="me-1">
                Cancellation Requested
              </Badge>
            )}
            {estoppel['Rush'] && <Badge variant="danger">Rush</Badge>}
          </div>
          <h6 className="text-muted">
            <span className="text-dark">Date Requested: </span>
            {moment(estoppel['Date Ordered']).format('MMMM Do, YYYY')}
          </h6>
        </div>
        {!isStaff(role) && <hr className="my-2" />}
        <OverViewColumns
          data={estoppel}
          fieldsToShow={isStaff(role) ? commonEstoppelFields : commonRowsClient}
          dateFields={dateFields}
          priceFields={priceFields}
        />

        <Row>
          {hoaS.map(hoa => {
            return (
              estoppel[hoa] && (
                <Col xs={12} md={4} className="mt-3">
                  <Alert variant="primary">
                    <h6 className="mb-0">
                      <b>{hoa.replace(' Info', '')}</b>
                    </h6>
                    <hr className="my-1 border-secondary" />
                    <OverViewColumns
                      md={12}
                      mt={1}
                      data={estoppel[hoa]}
                      fieldsToShow={['HOA Name', 'HOA Management Company', 'HOA Phone Number', 'HOA Email']}
                    />
                  </Alert>
                </Col>
              )
            );
          })}
        </Row>
        {estoppel['Files'] && estoppel['Files'].length > 0 && <FileDetails files={estoppel['Files']} />}

        {isStaff(role) && (
          <Row>
            <Col xs={12} md={6}>
              <IndividualServiceTasks
                tasks={estoppel['tasks']}
                onAddClick={onTaskAddClick}
                onEditClick={onTaskEditClick}
                onStatusUpdate={onTaskStatusUpdate}
                onTaskDelete={onTaskDelete}
              />
            </Col>
            <Col>
              <IndividualServiceNotes
                notes={estoppel['Notes']}
                onAddClick={onNoteAddClick}
                onEditClick={onNoteEditClick}
                serviceType={'estoppel'}
                typeId={estoppel['estoppelId']}
                onNoteDelete={onNoteDelete}
              />
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default EstoppelDetails;
