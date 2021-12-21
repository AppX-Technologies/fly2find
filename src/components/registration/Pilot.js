import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { ArrowRightCircle, CheckCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormGenerator from '../../form-generator/FormGenerator';
import { highlightError } from '../../form-generator/helpers/utility';
import { makeApiRequests } from '../../helpers/api';
import { pilotForm } from './form';

const clientServerKey = {
  'How many flight ops would you like to see each week?': 'Flights per Week',
  'Only fly Jaunts on Weekends?': 'Only Weekends',
  'How would you like to get notified?': 'Notification Channels',
  'Your favorite destination': 'Favorite Destination',
  'Why was the destination the best so far?': 'Favorite Destination Comment',
  'TXT Cell Number (Required for Beta Testers)': 'Cell Number',
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

  const capitalizeText = e => {
    e.target.value = e.target.value.toUpperCase();
  };

  window['onRegisterPilotFormSubmit'] = onRegisterPilotFormSubmit;
  window['capitalizeText'] = capitalizeText;

  return (
    <Row className={`${requestSubmitted ? 'vh-100' : 'h-100'} justify-content-center`}>
      <Col xs={11} md={9} className="align-self-center py-5">
        <Card>
          <Card.Body>
            {requestSubmitted ? (
              <div className="text-center p-3">
                <CheckCircleFill size={50} className="text-success" />
                <h5 className="text-primary2 mt-3">
                  Thank you!
                  <br />
                  Your first Jaunt will arrive shortly!
                </h5>
                <hr />
                <div>
                  See the latest Jaunts your fellow pilots have completed
                  <Link to={'/jaunt/recent'}>
                    <Button size="sm" variant="dark" className="ml-2 rounded">
                      HERE <ArrowRightCircle className="ml-2" />
                    </Button>
                  </Link>
                </div>
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
