import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { ArrowLeftCircle, ArrowRightCircle, CheckCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormGenerator from '../../form-generator/FormGenerator';
import { makeApiRequests } from '../../helpers/api';
import { finishJauntForm } from '../../helpers/forms';

const FinishJaunt = () => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const onFinishJaunFormSubmit = async form => {
    toast.info('Please wait, your request is being submitted!');

    const { error, response } = await makeApiRequests({
      requestType: 'finishJaunt',
      requestBody: { formData: form }
    });

    if (error) {
      return toast.error(error);
    }

    setRequestSubmitted(true);
    toast.success('Request Submitted successfully');
  };

  window['onFinishJaunFormSubmit'] = onFinishJaunFormSubmit;

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
                  We will get back to you shortly!
                </h5>
                <hr />
                <div>
                  <Link to={'/'}>
                    <Button size="sm" variant="dark" className="ms-2 rounded">
                      <ArrowLeftCircle className="me-2" /> Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <FormGenerator formJson={finishJauntForm} />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default FinishJaunt;
