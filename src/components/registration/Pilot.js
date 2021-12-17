import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import FormGenerator from '../../form-generator/FormGenerator';
import { highlightError } from '../../form-generator/helpers/utility';
import { makeApiRequests } from '../../helpers/api';
import { pilotForm } from './form';

const clientServerKey = {
  'How many flight options would you like to see each week?': 'Flights per Week',
  'Only fly Weekends?': 'Only Weekends',
  'How would you like to get notified?': 'Notification Channels',
  'Your favorite destination': 'Favorite Destination',
  'Why was the destination the best so far?': 'Favorite Destination Comment',
  'Cell Number (Required for Beta Testers)': 'Cell Number',
  'How did you hear of us?': 'About Us Comment'
};

const Pilot = () => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const onRegisterPilotFormSubmit = async form => {
    if (form['Tail Number'].length != 6) {
      return highlightError(document.getElementById('tailNumber'), 'Please provide a 6 character tail number');
    }

    if (form['Home Airport Code'].length != 3 && form['Home Airport Code'].length != 4) {
      return highlightError(
        document.getElementById('homeAirportCode'),
        'Please provide a 3 or 4 character home airport code'
      );
    }

    Object.keys(clientServerKey).forEach(key => {
      form[clientServerKey[key]] = form[key];
      delete form[key];
    });

    console.log(form);

    toast.info('Please wait, your request is being submitted!');

    const { error, response } = await makeApiRequests({
      requestType: 'processPilot',
      requestBody: { formData: form }
    });

    if (error) {
      return toast.error(error);
    }

    setRequestSubmitted(true);
    toast.success('Request Submitted successfully');
  };

  const capitalizeTailNumber = e => {
    e.target.value = e.target.value.toUpperCase();
  };

  window['onRegisterPilotFormSubmit'] = onRegisterPilotFormSubmit;
  window['capitalizeTailNumber'] = capitalizeTailNumber;

  return (
    <Row className={`${requestSubmitted ? 'vh-100' : 'h-100'} justify-content-center`}>
      <Col xs={11} md={9} className="align-self-center py-5">
        <Card>
          <Card.Body>
            {requestSubmitted ? (
              <div className="text-center p-3">
                <CheckCircleFill size={50} className="text-success" />
                <h5 className="text-primary2 mt-3">
                  Thank you! we have received your registeration request. We will get back to you shortly
                </h5>
              </div>
            ) : (
              <FormGenerator formJson={pilotForm} />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Pilot;
