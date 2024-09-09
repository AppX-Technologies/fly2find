import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import BlockSelectInput from '../../form-generator/components/BlockSelectInput';
import { pilotFormFields, pilotFormSchema } from '../../helpers/forms';

export default function PilotForm({ onFormSubmit, initialValue }) {
  const [formData, setFormData] = useState(initialValue || {});
  const [error, setError] = useState({});
  const [isEditing, setIsEditing] = useState(initialValue !== null);

  useEffect(() => {
    if (initialValue) {
      setFormData(initialValue);
      setIsEditing(true);
    } else {
      setFormData({});
    }
  }, [initialValue]);

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

    if (pilotFormSchema) {
      try {
        // await pilotFormSchema.validate(formData, { abortEarly: false });
        await onFormSubmit(formData);
        setIsEditing(false);
        setFormData({});
      } catch (validationError) {
        const newErrors = {};

        if (validationError.inner && Array.isArray(validationError.inner)) {
          validationError.inner.forEach(err => {
            newErrors[err.path] = err.message;
          });
        } else {
          newErrors.general = validationError.message;
        }

        setError(newErrors);
      }
    } else {
      await onFormSubmit(formData);
      setIsEditing(false);
      setFormData({});
    }
  };

  return (
    <>
      <Container className="pt-2 pb-2 px-4">
        {!initialValue && <h5 className="mb-3 pb-3 border-bottom fs-8">Pilot Profile</h5>}
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
                    onChangeFunction={value => handleChange(field.id, value)}
                    errorMessage={error[field.id]}
                    value={formData[field.id] || []}
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
                    value={formData[field.id] || ''}
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
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
