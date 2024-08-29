import React, { useState } from 'react';
import { Col, FormCheck, FormControl, FormGroup, FormLabel, Row, Button, Container, Form } from 'react-bootstrap';
import { pilotForm } from '../registration/form';
import { pilotFormFields } from '../../helpers/forms';
import BlockSelectInput from '../../form-generator/components/BlockSelectInput';
import ControlInput from '../../form-generator/components/ControlBlockSelect';
import { pilotFormSchema } from '../../helpers/forms';

export default function PilotForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});

  const handleChange = (id, value) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [id]: value
      };
      return updatedData;
    });
    if (error[id]) {
      setError(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await pilotFormSchema.validate(formData, { abortEarly: false });
      await onFormSubmit(formData);
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setError(newErrors);
    }
  };

  console.log('errors', error);

  return (
    <>
      <Container className="pt-2 pb-2 px-4">
        <h5 className="mb-3 pb-3 border-bottom fs-8">Join as a Pilot</h5>{' '}
        <Row className="">
          {pilotFormFields.map((field, index) => (
            <Col md={(field.type === 'block-select' && field.multiple) || field.type === 'textarea' ? 12 : 6}>
              <FormGroup className="mb-3">
                <FormLabel xs={6}>
                  {field.label}
                  {field.required && <span style={{ color: 'red', marginLeft: '2px' }}>*</span>}
                </FormLabel>
                {field.type === 'block-select' ? (
                  <BlockSelectInput
                    id={field.id}
                    options={field.options}
                    multiple={field.multiple}
                    blockWidth={field.blockWidth}
                    required={field.required}
                    onChange={value => handleChange(field.id, value)}
                    errorMessage={error[field.id]}
                  />
                ) : field.type === 'textarea' || field.type === 'text' ? (
                  <FormControl
                    id={field.id}
                    as={field.type === 'textarea' ? 'textarea' : 'input'}
                    rows={field.type === 'textarea' ? 3 : undefined}
                    required={field.required}
                    placeholder={field.placeholder || ''}
                    onChange={e => handleChange(field.id, e.target.value)}
                    isInvalid={!!error[field.id]}
                  />
                ) : null}
                {error[field.id] && <Form.Control.Feedback type="invalid">{error[field.id]}</Form.Control.Feedback>}
              </FormGroup>
            </Col>
          ))}
        </Row>
        <Row>
          <Col xs={12} className="text-end">
            <Button type="submit" variant="primary" className="pl-0" onClick={handleSubmit}>
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
