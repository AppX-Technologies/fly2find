import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import FormGenerator from '../../form-generator/FormGenerator';
import { editFormJson } from './form';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { useHistory, useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import { PersonSquare } from 'react-bootstrap-icons';
import { setAttribute } from '../../form-generator/helpers/utility';
import { makeApiRequests } from '../../helpers/api';
import BackButton from '../BackButton';
import { countyCity } from '../../helpers/constants';

const EditService = ({ appChoices = {} }) => {
  const [role] = useState(localStorage.getItem('user-role'));
  const [form, setForm] = useState(editFormJson(role));
  const [isFormLoading, setFormLoading] = useState(true);
  const [serviceError, setServiceError] = useState('');
  const [preFillData, setPreFillData] = useState(null);
  const [orgs, setOrgs] = useState([]);

  const history = useHistory();
  const { id } = useParams();

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

    let combinedOrgs = orgIds.map((id, index) => ({ id, name: orgs[index] }));
    setOrgs(combinedOrgs);

    loadServiceDetails(combinedOrgs);
  }, []);

  const loadServiceDetails = async () => {
    const { error, response } = await makeApiRequests({
      requestBody: { serviceId: id },
      requestType: 'serviceDetails'
    });

    if (error) {
      setServiceError(error);
      setFormLoading(false);
      return;
    }

    setPreFillData({
      ...response['serviceDetails'],
      rush: response['serviceDetails']['Rush']
    });
    setFormLoading(false);
  };

  const onServiceRequestEditFormSubmit = async form => {
    toast(`Please wait your request is being updated...`, {
      type: 'info'
    });

    if (form['Organization Name']) {
      const index = orgs.findIndex(org => org.name === form['Organization Name']);
      form['organizationId'] = orgs[index].id;
    }

    const { response, error } = await makeApiRequests({
      requestType: 'processService',
      requestBody: { formData: { ...form, serviceId: id } }
    });
    if (error) {
      toast(error, {
        type: 'error'
      });
      return;
    }

    toast(`Service request updated successfully!`, {
      type: 'success'
    });

    history.push(`/services/${id}`);
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

  window['updateCounty'] = updateCounty;

  window['onServiceRequestEditFormSubmit'] = onServiceRequestEditFormSubmit;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <BackButton backPath={`/services/${id}`} />
          </Col>
        </Row>

        <hr />

        {isFormLoading && <Loader />}
        {!isFormLoading && preFillData && (
          <FormGenerator
            formJson={form}
            formValues={{ 'Update Service Request': preFillData }}
            headerIcons={{
              'Update Service Request': () => <PersonSquare size={24} className="text-dark align-text-bottom me-3" />
            }}
          />
        )}
        {serviceError && <NotFound text={serviceError} />}
      </Card.Body>
    </Card>
  );
};

export default EditService;
