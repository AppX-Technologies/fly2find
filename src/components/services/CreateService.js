import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, ProgressBar } from 'react-bootstrap';
import FormGenerator from '../../form-generator/FormGenerator';
import { formJson } from './form';
import { toast } from 'react-toastify';
import { makeApiRequests } from '../../helpers/api';
import { useHistory } from 'react-router-dom';
import { GearFill as Gear } from 'react-bootstrap-icons';
import ClientInfo from '../ClientInfo';
import { setAttribute } from '../../form-generator/helpers/utility';
import { countyCity } from '../../helpers/constants';

const CreateService = ({ appChoices = {} }) => {
  const [role] = useState(localStorage.getItem('user-role'));
  const [form, setForm] = useState(formJson(role));
  const [orgs, setOrgs] = useState([]);
  const [submitData, setSubmitData] = useState(null);
  const [submittingForm, setSubmittingForm] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const orgs = appChoices['Organization'] || [];
    const status = appChoices['Service Status'] || [];
    const cities = [];
    const counties = Object.keys(countyCity);
    counties.forEach(county => {
      cities.push(...countyCity[county]);
    });

    setAttribute(form, 'status', 'options', status);
    setAttribute(form, 'orgName', 'options', orgs);
    setAttribute(form, 'propertyCity', 'options', cities.filter(c => c.trim()));
    setAttribute(form, 'county', 'options', counties);

    setForm({ ...form });

    const orgIds = appChoices['organizationId'] || [];
    setOrgs(orgIds.map((id, index) => ({ id, name: orgs[index] })));
  }, []);

  const onServiceRequestFormSubmit = async form => {
    if (form['Organization Name']) {
      const index = orgs.findIndex(org => org.name === form['Organization Name']);
      form['organizationId'] = orgs[index].id;
    }

    setSubmitData(form);
  };

  const updateCounty = e => {
    if (!e) return;
    const city = e.target.value;
    let countyName = '';
    const counties = Object.keys(countyCity);

    for (const county of counties) {
      if (countyCity[county].includes(city)) {
        countyName = county;
        break;
      }
    }

    if (countyName) {
      document.getElementById('county').value = countyName;
    }
  };

  const onSubmit = async () => {
    setSubmittingForm(true);

    toast(`Please wait your request is being submitted...`, {
      type: 'info'
    });

    const { response, error } = await makeApiRequests({
      requestType: 'processService',
      requestBody: { formData: submitData }
    });
    if (error) {
      toast(error, {
        type: 'error'
      });
      setSubmitData(null);
      setSubmittingForm(false);
      return;
    }

    setSubmittingForm(false);
    setSubmitData(null);
    toast(`Service request created successfully!`, {
      type: 'success'
    });

    history.push(`/services/${response['serviceIds'][0]}`);
  };

  const ConfirmationModal = () => {
    return (
      <>
        <Modal show={submitData !== null} onHide={() => setSubmitData(null)} centered backdrop="static">
          <Modal.Header closeButton={!submittingForm}>
            <Modal.Title>Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please note that by clicking "Submit" you are creating the file. Don't forget to order a service (Estoppel,
            Lien Search or Survey) on the next screen!
            {submittingForm && (
              <ProgressBar variant="dark" className="my-2" label="Creating Service..." animated now={100} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col>
                <Button variant="danger" onClick={onSubmit} disabled={submittingForm}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  window['updateCounty'] = updateCounty;
  window['onServiceRequestFormSubmit'] = onServiceRequestFormSubmit;

  return (
    <Card>
      <Card.Body>
        {form && (
          <>
            {role === 'Client' && (
              <>
                <ClientInfo />
                <hr />
              </>
            )}

            <FormGenerator
              headerIcons={{
                'New Service Request': () => <Gear size={24} className="text-dark align-text-bottom mr-3" />
              }}
              formJson={form}
            />
            {ConfirmationModal()}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CreateService;
