import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Badge, Card, Dropdown, Row, Col } from 'react-bootstrap';
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

const commonFields = [
  'Assigned Processor',
  'Assigned Surveyer',
  'Surveyor Price',
  'Processing Fee',
  'Hard Copy',
  'Title Certification',
  'Buyer Certification',
  'Lender Certification',
  'Underwriter Certification',
  'Listing Agent Name',
  'Listing Agent Phone',
  'Needed Date'
];

const clientFields = [
  'Assigned Processor',
  'Total Cost',
  'Hard Copy',
  'Title Certification',
  'Buyer Certification',
  'Lender Certification',
  'Underwriter Certification',
  'Listing Agent Name',
  'Listing Agent Phone',
  'Needed Date'
];

const priceFields = ['Surveyor Price', 'Client Price', 'Total Cost', 'Processing Fee'];
const dateFields = ['Needed Date'];

const SurveyDetails = ({
  survey,
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
  const [status, setStatus] = useState(survey['Status'] || 'New Order');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const updateStatus = async s => {
    if (status === s) return;
    setUpdatingStatus(true);

    const formData = { surveyId: survey['surveyId'], Status: s };

    const { response, error } = await makeApiRequests({
      requestType: 'processIndividualService',
      requestBody: { formData, serviceType: 'survey' }
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

            {survey['Cancellation Requested'] && (
              <Badge variant="danger" className="me-1">
                Cancellation Requested
              </Badge>
            )}
            {survey['Rush'] && <Badge variant="danger">Rush</Badge>}
          </div>
          <h6 className="text-muted">
            <span className="text-dark">Date Requested: </span>
            {moment(survey['Date Ordered']).format('MMMM Do, YYYY')}
          </h6>
        </div>
        {!isStaff(role) && <hr className="my-2" />}
        <OverViewColumns
          className="mb-3"
          data={survey}
          fieldsToShow={role !== 'Client' ? commonFields : clientFields}
          priceFields={priceFields}
          dateFields={dateFields}
        />
        {survey['Files'] && survey['Files'].length > 0 && <FileDetails files={survey['Files']} />}
        {isStaff(role) && (
          <Row>
            <Col xs={12} md={6}>
              <IndividualServiceTasks
                tasks={survey['tasks']}
                onAddClick={onTaskAddClick}
                onEditClick={onTaskEditClick}
                onStatusUpdate={onTaskStatusUpdate}
                onTaskDelete={onTaskDelete}
              />
            </Col>
            <Col>
              <IndividualServiceNotes
                notes={survey['Notes']}
                onAddClick={onNoteAddClick}
                onEditClick={onNoteEditClick}
                serviceType={'survey'}
                typeId={survey['surveyId']}
                onNoteDelete={onNoteDelete}
              />
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default SurveyDetails;
