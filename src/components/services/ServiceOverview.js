import React, { useState } from 'react';
import { GearFill, Pen, Folder2Open, Trash, SlashCircle, FilePost } from 'react-bootstrap-icons';
import { Row, Col, Badge, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import OverViewColumns from '../OverViewColumns';
import { makeApiRequests } from '../../helpers/api';
import { toast } from 'react-toastify';
import { getVariantFromStatus } from '../../helpers/ui';
import CircularProgressBar from '../circular-progress';
import { isAdmin, isClient, isStaff } from '../../helpers/global';
import { indServiceMetas } from '../../helpers/constants';
import ResetChangeButton from './ResetChangeButton';

const commonRows = [
  'Buyer Name',
  'Buyer Phone Number',
  'Buyer Email',
  'Seller Name',
  'Seller Phone Number',
  'Seller Email',
  'Organization Name'
];

const addressFields = ['Property Address', 'City', 'State', 'Zip Code'];

const emailRows = ['Buyer Email', 'Seller Email'];

const numRows = ['Buyer Phone Number', 'Seller Phone Number'];

const findIncompleteServices = service => {
  const incompleteServices = [];

  indServiceMetas.forEach(o => {
    if (service[o.key]) {
      o.requiredFields.forEach(f => {
        if (Array.isArray(service[o.key][f]) && service[o.key][f].length === 0) {
          if (!incompleteServices.includes(o.name)) incompleteServices.push(o.name);
        } else {
          if (!service[o.key][f]) {
            if (!incompleteServices.includes(o.name)) incompleteServices.push(o.name);
          }
        }
      });
    }
  });
  return incompleteServices;
};

const ServiceOverview = ({
  service,
  fromDetails = false,
  role,
  onChangeRequestClick,
  onCancellationClick,
  onStatusUpdate,
  statuses = [],
  onDeleteClick,
  buttonDisabled = false,
  showCancelRequestButton = false,
  showChangeRequestButton = false,
  onChangeReset,
  onChangeApply
}) => {
  const [status, setStatus] = useState(service['Status'] || 'Active');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const updateStatus = async s => {
    if (status === s) return;

    if (s === 'Closed') {
      const incompleteServices = findIncompleteServices(service);
      if (incompleteServices.length !== 0) {
        toast.error(
          `All information about ${
            incompleteServices[0]
          } for this service is not complete. Please complete and try again`
        );
        return;
      }
    }
    setUpdatingStatus(true);

    const formData = { serviceId: service['serviceId'], Status: s };

    const { response, error } = await makeApiRequests({
      requestType: 'processService',
      requestBody: { formData }
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
    onStatusUpdate && onStatusUpdate(s, service);
  };

  const getUserDetails = () => {
    if (service['userName'] === 'Accurate Lien Search Staff') {
      return 'Accurate Lien Search';
    }

    return `${service['userName']}(${service['userEmail']})`;
  };

  return (
    <div className="d-flex">
      {!fromDetails && (
        <div className="text-center mb-3 p-2 rounded">
          <GearFill size={30} />
        </div>
      )}
      <div className={`flex-grow-1 ${fromDetails ? '' : 'ps-4'}`}>
        {service['New Closing Date'] && (
          <Row className="">
            <Col xs={12}>
              <Badge variant="danger" className="me-1 p-2">
                Closing Change Requested: {moment(service['New Closing Date']).format('MMM DD, yyyy')}
              </Badge>
              {!isClient(role) && (
                <ResetChangeButton service={service} onReset={onChangeReset} onApply={onChangeApply} />
              )}
            </Col>
          </Row>
        )}
        <div className="d-flex mt-3">
          <div className="flex-grow-1">
            <h5 className="me-3">
              {addressFields
                .map(field => service[field])
                .filter(value => (value ? value.trim() : false))
                .join(' ')}
            </h5>
            <div></div>

            {isClient(role) ? (
              <Badge variant={getVariantFromStatus(status)}>{service['Status'] || 'Active'}</Badge>
            ) : (
              <>
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

            {service['lienSearch'] && (
              <Badge variant="dark" className="ms-1">
                Lien Search
              </Badge>
            )}
            {service['estoppel'] && (
              <Badge variant="dark" className="ms-1">
                Estoppel
              </Badge>
            )}
            {service['survey'] && (
              <Badge variant="dark" className="ms-1">
                Survey
              </Badge>
            )}
          </div>

          <div>
            {fromDetails &&
              (isClient(role) ? (
                <>
                  {showChangeRequestButton && (
                    <Button variant="outline-dark" size="sm" className="py-1 ms-2" onClick={onChangeRequestClick}>
                      <Pen className="align-text-top me-2" />
                      Request Change
                    </Button>
                  )}
                  {showCancelRequestButton && (
                    <Button variant="outline-danger" size="sm" className="py-1 ms-2" onClick={onCancellationClick}>
                      <SlashCircle className="align-text-top me-2" />
                      Request Cancellation
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {service['Drive Folder'] && (
                    <a target="_blank" href={`https://drive.google.com/drive/folders/${service['Drive Folder']}`}>
                      <Button variant="outline-dark" size="sm" className="py-1 ms-2">
                        <Folder2Open className="align-text-top me-md-2" />
                        <span className="d-none d-md-inline-block">All Attachments</span>
                      </Button>
                    </a>
                  )}
                  <Button variant="outline-dark" size="sm" className="py-1 ms-2" onClick={onChangeRequestClick}>
                    <FilePost className="align-text-top me-2" />
                    Comment
                  </Button>
                  <Link to={`${service['serviceId']}/edit`}>
                    <Button variant="outline-dark" size="sm" className="py-1 ms-2">
                      <Pen className="align-text-top me-md-2" />
                      <span className="d-none d-md-inline-block">Edit</span>
                    </Button>
                  </Link>
                  {isAdmin(role) && (
                    <Button
                      disabled={buttonDisabled}
                      onClick={onDeleteClick}
                      variant="outline-danger"
                      size="sm"
                      className="py-1 ms-2"
                    >
                      <Trash className="align-text-top me-md-2" />
                      <span className="d-none d-md-inline-block">Delete</span>
                    </Button>
                  )}
                </>
              ))}
          </div>
        </div>

        <Row className="mt-3">
          <Col xs={12} md={4}>
            <p className="mb-0  text-secondary">
              <span className="text-dark">Accurate ID: </span>
              {service['serviceId']}
            </p>
          </Col>

          <Col xs={12} md={4}>
            <p className="mb-0  text-secondary">
              <span className="text-dark">Closing Date: </span>
              {moment(service['Closing Date']).format('MMMM Do YYYY')}
            </p>
          </Col>

          <Col xs={12} md={4}>
            <p className="mb-0  text-secondary">
              <span className="text-dark">Date Ordered: </span>
              {moment(service['Date Created']).format('MMMM Do YYYY')}
            </p>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col xs={12} md={8}>
            <p className="mb-0  text-secondary">
              <span className="text-dark">Folio #: </span>
              {service['Folio #'] ? service['Folio #'].join(', ') : 'N/A'}
            </p>
          </Col>
          <Col xs={12} md={4}>
            <p className="mb-0  text-secondary">
              <span className="text-dark">File Name/Number: </span>
              {service['File Name/Number'] || 'N/A'}
            </p>
          </Col>
        </Row>
        {fromDetails && (
          <OverViewColumns data={service} fieldsToShow={commonRows} emailRows={emailRows} numRows={numRows} />
        )}

        {fromDetails && service['Legal Description'] && (
          <Row>
            <Col className="mt-2" xs={12}>
              <h6>Legal Description:</h6>
              <div className="alert alert-danger rounded px-3 py-2 mt-1 mb-0">{service['Legal Description']}</div>
            </Col>
          </Row>
        )}

        {fromDetails && service['Modifications / Special Instructions'] && (
          <Row>
            <Col className="mt-2" xs={12}>
              <h6>Modifications / Special Instructions:</h6>
              <div className="alert alert-warning rounded px-3 py-2 mt-1">
                {service['Modifications / Special Instructions']}
              </div>
            </Col>
          </Row>
        )}

        <Row style={styles.smallerFont} className="mt-2">
          <Col className="text-right text-muted">
            <i>Created by {service['userName'] ? getUserDetails() : 'N/A'}</i>
          </Col>
        </Row>

        <hr />
      </div>
    </div>
  );
};

const styles = {
  smallFont: {
    fontSize: 14
  },
  smallerFont: {
    fontSize: 12
  }
};

export default ServiceOverview;
