import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

export default function ControlInput({
  id,
  options,
  required = false,
  multiple = false,
  blockWidth = 3,
  onChange,
  defaultValue = [],
  errorMessage
}) {
  const [selectedOptions, setSelectedOptions] = useState(defaultValue);

  const handleOptionClick = option => {
    let newSelectedOptions = [];
    if (multiple) {
      if (selectedOptions.includes(option)) {
        newSelectedOptions = selectedOptions.filter(item => item !== option);
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }
    } else {
      newSelectedOptions = [option];
    }
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  return (
    <>
      <Row className="fg-blocks" id={`${id}-blocks`} data-required={required ? 'true' : 'false'}>
        {options.map((option, index) => (
          <Col
            className="block mt-3 text-center no-float"
            xs={12}
            sm={6}
            md={blockWidth}
            key={index}
            data-value={option}
            data-selected={selectedOptions.includes(option) ? 'true' : 'false'}
          >
            <div
              onClick={() => handleOptionClick(option)}
              className={`p-2 h-100 d-flex justify-content-center rounded hover-light border border-info ${
                selectedOptions.includes(option) ? 'bg-info text-white' : 'bg-white text-dark'
              }`}
            >
              <p className={`mb-0 align-self-center`}>{option}</p>
            </div>
          </Col>
        ))}
      </Row>
      {errorMessage && (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </>
  );
}
