import React, { useEffect, useState } from 'react';
import { FormControl, FormGroup, FormLabel, Row, Col, Button, Form } from 'react-bootstrap';
import { formFields } from '../../helpers/forms';

const defaultJauntFormValue = {
  callsign: '',
  code: '',
  experience: ''
};

export const FinishJauntForm = ({ formState, handleSubmit, errors, onFormChange }) => {
  const [formValues, setFormValues] = useState(defaultJauntFormValue);

  useEffect(() => {
    if (formState) {
      setFormValues(formState);
    }
  }, [formState]);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormValues(prev => {
      const updatedValues = { ...prev, [id]: value };
      onFormChange(updatedValues);
      return updatedValues;
    });
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      handleSubmit(e, formValues);
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="pt-2 pb-2">
      <h5 className="mb-3 pb-3 border-bottom fs-8">FinishJaunt</h5>{' '}
      <Row>
        {formFields.map(field => (
          <Col md={field.id === 'experience' ? 12 : 6} xs={12} key={field.id}>
            <FormGroup className="mb-3">
              <FormLabel>
                {field.label}
                <span className="text-danger red">*</span>
              </FormLabel>
              <FormControl
                id={field.id}
                type={field.type}
                as={field.type === 'textarea' ? 'textarea' : 'input'}
                value={formValues[field.id]}
                onChange={handleChange}
                isInvalid={!!errors[field.id]}
                required={field.required}
                placeholder={field.placeholder}
                rows={field.rows || undefined}
              />
              <Form.Control.Feedback type="invalid">{errors[field.id]}</Form.Control.Feedback>
            </FormGroup>
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={12} className="text-end">
          <Button type="submit" variant="primary" onClick={handleFormSubmit} className="pl-0">
            Finish
          </Button>
        </Col>
      </Row>
    </div>
  );
};
