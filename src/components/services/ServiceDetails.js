import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, ProgressBar, Row, Col } from 'react-bootstrap';
import { FileText } from 'react-bootstrap-icons';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../Loader';
import { makeApiRequests } from '../../helpers/api';
import { toast } from 'react-toastify';
import NotFound from '../NotFound';
import SlidingSideBar from '../SlidingSideBar/SlidingSideBar';
import FormGenerator from '../../form-generator/FormGenerator';
import { highlightError, setAttribute } from '../../form-generator/helpers/utility';
import ServiceOverview from './ServiceOverview';
import SurveyDetails from './SurveyDetails';
import LienSearchDetails from './LienSearchDetails';
import EstoppelDetails, { commonEstoppelFields } from './EstoppelDetails';
import {
  estoppelAdminRows,
  estoppelBottomRows,
  estoppelTopRow,
  fileRow,
  serviceCancelRequestFormJson,
  commentFormJson,
  serviceTypeForms,
  serviceChangeRequestFormJson
} from './form';
import BackButton from '../BackButton';
import SearchShortcut from '../SearchShortcut';
import { isAdmin, isClient, isStaff } from '../../helpers/global';
import TaskAddEdit from '../tasks/TaskAddEdit';
import NoteAddEdit from '../notes/NoteAddEdit';
import { indServiceMetas } from '../../helpers/constants';
import ResetCancellationButton from './ResetCancellationButton';
import lodash from 'lodash';

const ServiceDetails = ({ appChoices }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState();
  const [activeServiceForm, setActiveServiceForm] = useState();
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [cancelRequestSubmitting, setCancelRequestSubmitting] = useState(false);
  const [changeRequestSubmitting, setChangeRequestSubmitting] = useState(false);

  const [serviceLoadError, setServiceLoadError] = useState('');
  const [role] = useState(localStorage.getItem('user-role'));

  const [cancellationServices, setCancellationServices] = useState([]);
  const [selectedCancellationServices, setSelectedCancellationServices] = useState([]);

  const [showChangeRequestModal, setShowChangeRequestModal] = useState(false);
  const [selectedChangeRequestServices, setSelectedChangeRequestServices] = useState([]);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [preFill, setPreFill] = useState();
  const [underwriterCerts, setUnderwriterCerts] = useState([]);

  const [activeDeletingServiceType, setActiveDeletingServiceType] = useState('');
  const [serviceDeleting, setServiceDeleting] = useState(false);

  const history = useHistory();
  const historyState = history.location.state;

  const [statusOptions] = useState(appChoices['Service Status'] || []);
  const [indStatusOptions] = useState(appChoices['Individual Service Status'] || []);
  const [showTaskAddEditModal, setShowTaskAddEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState();
  const [activeTaskService, setActiveTaskService] = useState();

  const [showNoteAddEditModal, setShowNoteAddEditModal] = useState(false);
  const [editingNote, setEditingNote] = useState();
  const [editingNoteIndex, setEditingNoteIndex] = useState(-1); //-1 for add else index
  const [activeNoteService, setActiveNoteService] = useState();

  const loadServiceDetails = async () => {
    const { error, response } = await makeApiRequests({
      requestBody: { serviceId: id },
      requestType: 'serviceDetails'
    });

    if (error) {
      setServiceLoadError(error);
      setLoading(false);
      return;
    }

    setService(response['serviceDetails']);
    setLoading(false);
  };

  useEffect(() => {
    loadServiceDetails();
  }, []);

  const onServiceAddClose = () => {
    setActiveServiceForm(null);
    setPreFill(null);
  };

  const ServiceAddSideBar = () => {
    return (
      <SlidingSideBar
        fullScreen
        visible={
          role === 'Client' ? activeServiceForm && activeServiceForm['name'] !== 'Lien Search' : activeServiceForm
        }
        onClose={onServiceAddClose}
        title={activeServiceForm ? `${preFill ? 'Update ' : ''}${activeServiceForm['name']} request` : ''}
      >
        {activeServiceForm && (
          <FormGenerator formJson={activeServiceForm['form']} formValues={preFill ? preFill : undefined} />
        )}
      </SlidingSideBar>
    );
  };

  const LienSearchAddModal = () => {
    return (
      <Modal
        show={role === 'Client' && activeServiceForm && activeServiceForm['name'] === 'Lien Search'}
        onHide={onServiceAddClose}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Request Lien Search Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeServiceForm && <FormGenerator formJson={activeServiceForm['form']} />}
          {requestSubmitting && <ProgressBar variant="dark" animated now={100} label="Submitting Request..." />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onServiceAddClose} disabled={requestSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              document.getElementById('liensearch').click();
            }}
            disabled={requestSubmitting}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const setActiveForm = ({ name, serviceTypeKey, fromEdit = false }) => {
    //for deep clone
    let form = lodash.cloneDeep(serviceTypeForms[name][role]);

    const status = appChoices['Individual Service Status'] || [];
    const processor = appChoices['Processor'] || [];
    const surveyors = appChoices['Surveyor'] || [];

    setAttribute(form, 'status', 'options', status);
    setAttribute(form, 'assignedProcess', 'options', processor.map(o => ({ option: o, value: o })));

    if (name === 'Survey') {
      const certs = appChoices['Underwriter Certification'] || [];
      setAttribute(form, 'UnderwriterCertification', 'options', [...certs, 'Other']);
      setAttribute(form, 'assignedSurveyer', 'options', surveyors);
      setUnderwriterCerts(certs);
    }

    //prefill
    if (!fromEdit) {
      const orgIndex = appChoices['Organization'].findIndex(o => o === service['Organization Name']);
      if (orgIndex !== -1) {
        setAttribute(form, 'processingFee', 'value', appChoices[`${name} Processing Fee`][orgIndex]);
      }
    }

    setActiveServiceForm({ name, form, key: serviceTypeKey });
  };

  const AddService = ({ name, serviceTypeKey }) => {
    return (
      <Row className="my-5 text-center">
        <Col>
          <p style={{ fontSize: 14 }} className="mb-1">
            No {name} request found! Tap the button below to add one.
          </p>
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setActiveForm({ name, serviceTypeKey });
            }}
          >
            Add
          </Button>
        </Col>
      </Row>
    );
  };

  const onHoaCountChange = e => {
    const count = [...document.getElementsByName('numHOA')]
      .filter(input => input.type === 'radio')
      .filter(input => input.checked)[0].value;

    const hoaRows = [];
    for (let index = 1; index <= parseInt(count); index++) {
      const hoaElem = [
        {
          columns: [
            {
              default: 12,
              xs: 12,
              field: {
                html: `<h5 class='text-muted'>HOA ${index}</h5><hr/>`,
                type: 'custom-html'
              }
            }
          ]
        },
        {
          columns: [
            {
              default: 6,
              xs: 12,
              field: {
                id: `hoa${index}Name`,
                title: `HOA ${index} Name`,
                type: 'text',
                required: true
              }
            },
            {
              default: 6,
              xs: 12,
              field: {
                id: `hoa${index}ManagementCompany`,
                title: `HOA ${index} Management Company`,
                type: 'text',
                required: true
              }
            }
          ]
        },
        {
          columns: [
            {
              default: 6,
              xs: 12,
              field: {
                id: `hoa${index}PhoneNumber`,
                title: `HOA ${index} Phone Number`,
                type: 'text',
                required: false
              }
            },
            {
              default: 6,
              xs: 12,
              field: {
                id: `hoa${index}Email`,
                title: `HOA ${index} Email`,
                type: 'text',
                required: false
              }
            }
          ]
        }
      ];
      hoaRows.push(...hoaElem);
    }

    activeServiceForm['form']['forms'][0]['rows'] = [
      ...(isStaff(role) ? activeServiceForm['form']['forms'][0]['rows'].slice(0, 3) : []),
      estoppelTopRow,
      ...hoaRows,
      ...estoppelBottomRows
    ];

    if (isStaff(role)) {
      activeServiceForm['form']['forms'][0]['rows'].push(fileRow);
    }

    setActiveServiceForm({ ...activeServiceForm });
  };

  const CommentModal = () => {
    return (
      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Submit a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGenerator formJson={commentFormJson} />
          {commentSubmitting && <ProgressBar variant="dark" animated now={100} label="Submitting comment..." />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCommentModal(false)} disabled={commentSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              document.getElementById('requestchange').click();
            }}
            disabled={commentSubmitting}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const onCancelModalHide = () => {
    setCancellationServices([]);
    setSelectedCancellationServices([]);
  };

  const onChangeModalHide = () => {
    setShowChangeRequestModal(false);
  };

  const CancelRequestModal = () => {
    return (
      <Modal show={cancellationServices.length !== 0} onHide={onCancelModalHide} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Submit a cancel request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGenerator formJson={serviceCancelRequestFormJson(cancellationServices, selectedCancellationServices)} />
          {cancelRequestSubmitting && (
            <ProgressBar variant="dark" animated now={100} label="Submitting Cancel Request..." />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancelModalHide} disabled={cancelRequestSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              document.getElementById('requestcancellation').click();
            }}
            disabled={cancelRequestSubmitting}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const ChangeRequestModal = () => {
    return (
      <Modal show={showChangeRequestModal} onHide={onChangeModalHide} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Submit a change request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGenerator formJson={serviceChangeRequestFormJson} />
          {changeRequestSubmitting && (
            <ProgressBar variant="dark" animated now={100} label="Submitting Change Request..." />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onChangeModalHide} disabled={changeRequestSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              document.getElementById('requestchange').click();
            }}
            disabled={changeRequestSubmitting}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const preFillForm = (label, serviceType) => {
    const preFillData = { ...service[serviceType], Files: undefined, rush: service[serviceType]['Rush'] };
    if (serviceType === 'survey') {
      if (!underwriterCerts.includes(preFillData['Underwriter Certification'])) {
        preFillData['UnderwriterCertificationOther'] = preFillData['Underwriter Certification'];
        preFillData['Underwriter Certification'] = 'Other';
      }
    }

    if (serviceType === 'survey') {
      if (!underwriterCerts.includes(preFillData['Underwriter Certification'])) {
        preFillData['UnderwriterCertificationOther'] = preFillData['Underwriter Certification'];
        preFillData['Underwriter Certification'] = 'Other';
      }
    }

    if (serviceType === 'estoppel') {
      let hoaCount = 0;
      ['HOA 1 Info', 'HOA 2 Info', 'HOA 3 Info'].forEach((hoa, index) => {
        const hoaData = preFillData[hoa];
        if (hoaData) {
          preFillData[`HOA ${index + 1} Name`] = hoaData['HOA Name'];
          preFillData[`HOA ${index + 1} Management Company`] = hoaData['HOA Management Company'];
          preFillData[`HOA ${index + 1} Phone Number`] = hoaData['HOA Phone Number'];
          preFillData[`HOA ${index + 1} Email`] = hoaData['HOA Email'];
          hoaCount++;
        }
      });
      preFillData['How Many HOAs?'] = hoaCount;
    }

    if (!preFillData['Processing Fee']) {
      const orgIndex = appChoices['Organization'].findIndex(o => o === service['Organization Name']);
      if (orgIndex !== -1) {
        preFillData['Processing Fee'] = appChoices[`${label} Processing Fee`][orgIndex];
      }
    }

    setPreFill({ [label]: preFillData });
  };

  const onEditClick = (label, serviceType) => {
    preFillForm(label, serviceType);
    setActiveForm({ name: label, serviceTypeKey: serviceType, fromEdit: true });
  };

  const onCancellationReset = indServiceType => {
    service[indServiceType]['Cancellation Requested'] = false;
    setService({ ...service });
  };

  const onChangeReset = () => {
    service['New Closing Date'] = '';
    setService({ ...service });
  };

  const onChangeApply = () => {
    service['Closing Date'] = service['New Closing Date'];
    service['New Closing Date'] = '';
    setService({ ...service });
  };

  const ServiceTypeHeader = ({ label, serviceType }) => {
    return (
      <div className="d-flex">
        <div className="flex-grow-1">
          <h5>
            <FileText size={20} className="align-text-top me-2" />
            {label}
          </h5>
        </div>

        {service[serviceType] && (
          <>
            {isStaff(role) && (
              <>
                {service[serviceType]['Cancellation Requested'] && (
                  <ResetCancellationButton
                    service={service}
                    indServiceType={serviceType}
                    onReset={(service, serviceType) => onCancellationReset(serviceType)}
                  />
                )}
                <Button className="ms-1" variant="info" size="sm" onClick={() => onEditClick(label, serviceType)}>
                  Edit
                </Button>
              </>
            )}
            {isAdmin(role) && (
              <Button
                className="ms-1"
                variant="danger"
                size="sm"
                onClick={() => setActiveDeletingServiceType({ name: label, key: serviceType })}
              >
                Delete
              </Button>
            )}
          </>
        )}
      </div>
    );
  };

  const onEstoppelFormSubmit = async form => {
    if (form['Assigned Processor']) {
      //for admin
      if (form['Assigned Processor'].length === 0) {
        return highlightError(document.getElementById('assignedProcess'));
      }
    } else {
      //for client
      form['Assigned Processor'] = ['Catalina Pinzon'];
    }

    const extractedFields = {};
    ['Status', ...commonEstoppelFields].forEach(f => (extractedFields[f] = form[f]));

    const formData = { ...extractedFields, Rush: form['rush'] };
    const hoaCount = parseInt(form['How Many HOAs?']);

    for (let index = 1; index <= hoaCount; index++) {
      const hoaKeys = Object.keys(form).filter(k => k.startsWith(`HOA ${index}`));
      formData[`HOA ${index} Info`] = {};
      hoaKeys.forEach(k => {
        const actualKey = k.replace(` ${index}`, '');
        formData[`HOA ${index} Info`][actualKey] = form[k];
      });
    }

    if (Object.keys(form).includes('Files')) {
      formData['Files'] = form['Files'].map(f => ({ ...f, showToClient: f.checked }));
    }

    if (preFill && preFill['Estoppel'] && preFill['Estoppel']['estoppelId']) {
      formData['estoppelId'] = preFill['Estoppel']['estoppelId'];
    }

    await submitRequest(formData);
  };

  const onLienSearchFormSubmit = async form => {
    if (form['Assigned Processor']) {
      //for admin
      if (form['Assigned Processor'].length === 0) {
        return highlightError(document.getElementById('assignedProcess'));
      }
    } else {
      //for client
      form['Assigned Processor'] = ['Jessica Vargas'];
    }

    if (Object.keys(form).includes('Files')) {
      form['Files'] = form['Files'].map(f => ({ ...f, showToClient: f.checked }));
    }

    if (preFill && preFill['Lien Search'] && preFill['Lien Search']['lienSearchId']) {
      form['lienSearchId'] = preFill['Lien Search']['lienSearchId'];
    }

    await submitRequest({ Rush: form['rush'], ...form });
  };

  const onSurveyFormSubmit = async form => {
    if (form['Assigned Processor']) {
      //for admin
      if (form['Assigned Processor'].length === 0) {
        return highlightError(document.getElementById('assignedProcess'));
      }
    } else {
      //for client
      form['Assigned Processor'] = ['Catalina Pinzon'];
    }

    if (form['Underwriter Certification'] === 'Other') {
      form['Underwriter Certification'] = form['UnderwriterCertificationOther'];
    }

    if (Object.keys(form).includes('Files')) {
      form['Files'] = form['Files'].map(f => ({ ...f, showToClient: f.checked }));
    }

    if (preFill && preFill['Survey'] && preFill['Survey']['surveyId']) {
      form['surveyId'] = preFill['Survey']['surveyId'];
    }

    await submitRequest({ Rush: form['rush'], ...form });
  };

  const submitRequest = async (formData = {}) => {
    formData['serviceId'] = id;

    setRequestSubmitting(true);

    toast(`Please wait request is being submitted...`, {
      type: 'info'
    });

    const { response, error } = await makeApiRequests({
      requestType: 'processIndividualService',
      requestBody: { formData, serviceType: activeServiceForm['key'] }
    });

    if (error) {
      toast(error, {
        type: 'error'
      });
      setRequestSubmitting(false);
      return;
    }

    toast(`Request submitted successfully!`, {
      type: 'success'
    });

    const oldStatus = service[activeServiceForm['key']] ? service[activeServiceForm['key']]['Status'] : '';
    const newStatus = formData['Status'];
    const existingFiles = service[activeServiceForm['key']] ? service[activeServiceForm['key']]['Files'] : [];
    const newFiles = formData['Files'];

    service[activeServiceForm['key']] = {
      ...(service[activeServiceForm['key']] || {}),
      ...formData,
      [`${activeServiceForm['key']}Id`]: response[`${activeServiceForm['key']}Id`][0]
    };

    service[activeServiceForm['key']]['Files'] = existingFiles;
    if (newFiles) {
      service[activeServiceForm['key']]['Files'].push(...newFiles);
    }

    if (activeServiceForm['key'] === 'lienSearch' && oldStatus !== 'Pending To Pay' && newStatus === 'Pending To Pay') {
      service[activeServiceForm['key']]['Date Delivered'] = new Date().toISOString();
    }

    setService({ ...service });

    setRequestSubmitting(false);
    setActiveServiceForm(null);
    setPreFill(null);

    if (formData['Files'] && formData['Files'].length > 0) {
      setTimeout(() => document.location.reload(), 1000);
    }
  };

  const onCommentFormSubmit = async form => {
    setCommentSubmitting(true);

    const { response, error } = await makeApiRequests({
      requestType: 'processService',
      requestBody: { formData: { ...form, serviceId: id } }
    });
    if (error) {
      toast(response['reason'] || 'Oops something went wrong!', {
        type: 'error'
      });
      setCommentSubmitting(false);
      return;
    }

    setService({ ...service, ...form });
    setCommentSubmitting(false);
    setShowCommentModal(false);

    toast(`Change request submitted successfully!`, {
      type: 'success'
    });
  };

  window['onLienSearchFormSubmit'] = onLienSearchFormSubmit;
  window['onEstoppelFormSubmit'] = onEstoppelFormSubmit;
  window['onSurveyFormSubmit'] = onSurveyFormSubmit;
  window['onHoaCountChange'] = onHoaCountChange;
  window['onCommentFormSubmit'] = onCommentFormSubmit;

  const updateServiceStatus = s => {
    service['Status'] = s;
    setService({ ...service });
  };

  const updateIndServiceStatus = (s, key) => {
    if (service[key]) {
      service[key]['Status'] = s;
      setService({ ...service });
    }
  };

  const handleClose = () => {
    setActiveDeletingServiceType('');
  };

  const deleteService = async () => {
    setServiceDeleting(true);
    const mainServiceDeleting = activeDeletingServiceType === 'main';
    const requestBody = {
      serviceId: mainServiceDeleting ? id : service[activeDeletingServiceType.key][`${activeDeletingServiceType.key}Id`]
    };

    if (!mainServiceDeleting) {
      requestBody.serviceType = activeDeletingServiceType.name;
    }

    try {
      const { response, error } = await makeApiRequests({
        requestType: mainServiceDeleting ? 'deleteService' : 'deleteIndividualService',
        requestBody
      });

      if (error) {
        toast(error, {
          type: 'error'
        });
        setServiceDeleting(false);
        return;
      }

      toast(`Service deleted successfully!`, {
        type: 'success'
      });

      setActiveDeletingServiceType('');
      setServiceDeleting(false);

      if (mainServiceDeleting) {
        history.push('/services/search');
      } else {
        service[activeDeletingServiceType.key] = undefined;
        setService({ ...service });
      }
    } catch (e) {
      toast('Oops, something went wrong!', {
        type: 'error'
      });
      setServiceDeleting(false);
    }
  };

  const DeleteModal = () => {
    return (
      <Modal show={activeDeletingServiceType} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>
            Delete {activeDeletingServiceType === 'main' ? 'Service' : activeDeletingServiceType.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this{' '}
          <b>{activeDeletingServiceType === 'main' ? 'Service' : activeDeletingServiceType.name}</b>? This action cannot
          be undone!
          {serviceDeleting && (
            <ProgressBar
              variant="dark"
              animated
              now={100}
              label={`Deleting ${activeDeletingServiceType === 'main' ? 'Service' : activeDeletingServiceType.name}...`}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={serviceDeleting}>
            No
          </Button>
          <Button variant="danger" onClick={deleteService} disabled={serviceDeleting}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const onTaskEditClick = (task, serviceType) => {
    setEditingTask(task);
    setActiveTaskService({ type: serviceType, id: service[serviceType][`${serviceType}Id`] });

    setShowTaskAddEditModal(true);
  };

  const updateTaskStatus = (s, task) => {
    const serviceType = task.serviceType;
    const index = service[serviceType]['tasks'].findIndex(t => t['taskId'] === task['taskId']);
    if (index !== -1) {
      service[serviceType]['tasks'][index]['Status'] = s;
      setService({ ...service });
    }
  };

  const onTaskDelete = task => {
    const serviceType = task.serviceType;
    const index = service[serviceType]['tasks'].findIndex(t => t['taskId'] === task['taskId']);
    if (index !== -1) {
      service[serviceType]['tasks'].splice(index, 1);
      setService({ ...service });
    }
  };

  const onNoteDelete = (index, serviceType) => {
    if (index !== -1) {
      service[serviceType]['Notes'].splice(index, 1);
      setService({ ...service });
    }
  };

  const onTaskAddEdit = task => {
    const serviceType = task.serviceType;

    const existingIndex = service[serviceType]['tasks'].findIndex(t => t.taskId === task.taskId);
    toast(existingIndex === -1 ? `A new incomplete task added successfully!` : 'Task updated successfully', {
      type: 'success'
    });

    if (existingIndex === -1) {
      service[serviceType]['tasks'] = [task, ...service[serviceType]['tasks']];
    } else {
      service[serviceType]['tasks'][existingIndex] = task;
    }

    setService({ ...service });

    setEditingTask(null);
    setShowTaskAddEditModal(false);
  };

  const onNoteAddEdit = (note, serviceType, existingIndex) => {
    toast(existingIndex === -1 ? `Note added successfully!` : 'Note updated successfully', {
      type: 'success'
    });

    if (existingIndex === -1) {
      service[serviceType]['Notes'] = [note, ...(service[serviceType]['Notes'] || [])];
    } else {
      service[serviceType]['Notes'][existingIndex] = note;
    }

    setService({ ...service });

    setEditingNote(null);
    setEditingNoteIndex(-1);
    setShowNoteAddEditModal(false);
  };

  const onTaskAddClick = serviceType => {
    setActiveTaskService({ type: serviceType, id: service[serviceType][`${serviceType}Id`] });
    setShowTaskAddEditModal(true);
  };

  const onNoteAddClick = serviceType => {
    setActiveNoteService({ type: serviceType, id: service[serviceType][`${serviceType}Id`] });
    setShowNoteAddEditModal(true);
  };

  const onNoteEditClick = (note, index, serviceType) => {
    setEditingNote(note);
    setEditingNoteIndex(index);
    setActiveNoteService({ type: serviceType, id: service[serviceType][`${serviceType}Id`] });

    setShowNoteAddEditModal(true);
  };

  const onCancellationClick = () => {
    const options = [];

    indServiceMetas.forEach(o => {
      if (service[o.key] && !service[o.key]['Cancellation Requested']) {
        options.push(o.name);
      }
    });

    setCancellationServices(options);
  };

  const onChangeRequestClick = () => {
    if (isClient(role)) {
      setShowChangeRequestModal(true);
    } else {
      setShowCommentModal(true);
    }
  };

  const onCancelServiceSelect = (e, options) => {
    setSelectedCancellationServices(options);
  };

  const onChangeServiceSelect = (e, options) => {
    setSelectedChangeRequestServices(options);
  };

  const onServiceCancelRequestFormSubmit = async form => {
    const selectedServices = [];
    indServiceMetas.forEach(o => {
      if (selectedCancellationServices.includes(o.name)) {
        selectedServices.push({
          serviceType: o.key,
          typeId: service[o.key][`${o.key}Id`],
          note: form[`${o.name} Notes`],
          file: form[`${o.name} File`]
        });
      }
    });

    const formData = {
      serviceId: service['serviceId'],
      services: selectedServices
    };

    setCancelRequestSubmitting(true);

    try {
      const { response, error } = await makeApiRequests({
        requestType: 'requestServiceCancellation',
        requestBody: formData
      });

      if (error) {
        toast(error, {
          type: 'error'
        });
        setCancelRequestSubmitting(false);
        return;
      }

      toast(`Cancel request submitted successfully!`, {
        type: 'success'
      });

      selectedServices.forEach(s => {
        service[s.serviceType]['Cancellation Requested'] = true;
      });

      setService({ ...service });
      setCancelRequestSubmitting(false);
      onCancelModalHide();
    } catch (e) {
      toast('Oops, something went wrong!', {
        type: 'error'
      });
      setCancelRequestSubmitting(false);
    }
  };

  const onServiceChangeRequestFormSubmit = async form => {
    const formData = {
      serviceId: service['serviceId'],
      ...form
    };

    setChangeRequestSubmitting(true);

    try {
      const { response, error } = await makeApiRequests({
        requestType: 'requestChange',
        requestBody: formData
      });

      if (error) {
        toast(error, {
          type: 'error'
        });
        setChangeRequestSubmitting(false);
        return;
      }

      toast(`Change request submitted successfully!`, {
        type: 'success'
      });

      service['New Closing Date'] = form['New Closing Date'];
      setService({ ...service });
      setChangeRequestSubmitting(false);
      onChangeModalHide();
    } catch (e) {
      toast('Oops, something went wrong!', {
        type: 'error'
      });
      setChangeRequestSubmitting(false);
    }
  };

  window['onServiceChangeRequestFormSubmit'] = onServiceChangeRequestFormSubmit;

  window['onServiceCancelRequestFormSubmit'] = onServiceCancelRequestFormSubmit;
  window['onCancelServiceSelect'] = onCancelServiceSelect;
  window['onChangeServiceSelect'] = onChangeServiceSelect;

  const showCancelRequestButton = () => {
    return indServiceMetas.some(o => service[o.key] && !service[o.key]['Cancellation Requested']);
  };

  const showChangeRequestButton = () => {
    return !service['New Closing Date'];
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex mb-4">
          <BackButton backPath={historyState && historyState.fromPath ? historyState.fromPath : '/services/search'} />
          <div className="flex-grow-1 ms-3">
            <SearchShortcut />
          </div>
        </div>
        <hr />
        {loading && <Loader />}
        {service && (
          <>
            {ServiceAddSideBar()}
            {CommentModal()}
            {CancelRequestModal()}
            {ChangeRequestModal()}
            <ServiceOverview
              service={service}
              role={role}
              onChangeRequestClick={onChangeRequestClick}
              onCancellationClick={onCancellationClick}
              fromDetails
              onStatusUpdate={updateServiceStatus}
              statuses={statusOptions}
              onDeleteClick={() => setActiveDeletingServiceType('main')}
              buttonDisabled={serviceDeleting}
              showCancelRequestButton={showCancelRequestButton()}
              showChangeRequestButton={showChangeRequestButton()}
              onChangeReset={onChangeReset}
              onChangeApply={onChangeApply}
            />
            {isAdmin(role) && DeleteModal()}
            <ServiceTypeHeader label="Lien Search" serviceType="lienSearch" />
            <hr />
            {service['lienSearch'] ? (
              <LienSearchDetails
                onStatusUpdate={s => updateIndServiceStatus(s, 'lienSearch')}
                statuses={indStatusOptions}
                role={role}
                lienSearch={service['lienSearch']}
                onTaskAddClick={() => onTaskAddClick('lienSearch')}
                onTaskEditClick={task => onTaskEditClick(task, 'lienSearch')}
                onNoteAddClick={() => onNoteAddClick('lienSearch')}
                onNoteEditClick={(note, index) => onNoteEditClick(note, index, 'lienSearch')}
                onTaskStatusUpdate={updateTaskStatus}
                onTaskDelete={onTaskDelete}
                onNoteDelete={onNoteDelete}
              />
            ) : (
              <>
                <AddService name="Lien Search" serviceTypeKey="lienSearch" />
                {role === 'Client' && LienSearchAddModal()}
              </>
            )}
            <ServiceTypeHeader label="Estoppel" serviceType="estoppel" />

            <hr />
            {service['estoppel'] ? (
              <EstoppelDetails
                onStatusUpdate={s => updateIndServiceStatus(s, 'estoppel')}
                statuses={indStatusOptions}
                role={role}
                estoppel={service['estoppel']}
                onTaskAddClick={() => onTaskAddClick('estoppel')}
                onTaskEditClick={task => onTaskEditClick(task, 'estoppel')}
                onNoteAddClick={() => onNoteAddClick('estoppel')}
                onNoteEditClick={(note, index) => onNoteEditClick(note, index, 'estoppel')}
                onTaskStatusUpdate={updateTaskStatus}
                onTaskDelete={onTaskDelete}
                onNoteDelete={onNoteDelete}
              />
            ) : (
              <AddService name="Estoppel" serviceTypeKey="estoppel" />
            )}
            <ServiceTypeHeader label="Survey" serviceType="survey" />

            <hr />
            {service['survey'] ? (
              <SurveyDetails
                onStatusUpdate={s => updateIndServiceStatus(s, 'lienSearch')}
                statuses={indStatusOptions}
                role={role}
                survey={service['survey']}
                onTaskAddClick={() => onTaskAddClick('survey')}
                onTaskEditClick={task => onTaskEditClick(task, 'survey')}
                onNoteAddClick={() => onNoteAddClick('survey')}
                onNoteEditClick={(note, index) => onNoteEditClick(note, index, 'survey')}
                onTaskStatusUpdate={updateTaskStatus}
                onTaskDelete={onTaskDelete}
                onNoteDelete={onNoteDelete}
              />
            ) : (
              <AddService name="Survey" serviceTypeKey="survey" />
            )}
          </>
        )}
        {isStaff(role) && (
          <>
            {' '}
            <TaskAddEdit
              onHide={() => {
                setEditingTask(null);
                setActiveTaskService(null);
                setShowTaskAddEditModal(false);
              }}
              show={showTaskAddEditModal}
              onTaskAddEdit={onTaskAddEdit}
              editingTask={editingTask}
              taskMeta={
                activeTaskService
                  ? { serviceId: id, serviceType: activeTaskService.type, typeId: activeTaskService.id }
                  : undefined
              }
            />
            {activeNoteService && (
              <NoteAddEdit
                onHide={() => {
                  setEditingNote(null);
                  setActiveNoteService(null);
                  setShowNoteAddEditModal(false);
                }}
                show={showNoteAddEditModal}
                onNoteAddEdit={onNoteAddEdit}
                editingNote={editingNote}
                editingNoteIndex={editingNoteIndex}
                noteMeta={{ serviceId: id, serviceType: activeNoteService.type, typeId: activeNoteService.id }}
                notes={service[activeNoteService.type]['Notes']}
              />
            )}
          </>
        )}
        {serviceLoadError && <NotFound text={serviceLoadError} />}
      </Card.Body>
    </Card>
  );
};

export default ServiceDetails;
