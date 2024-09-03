import React from 'react';
import { Row, Col } from 'react-bootstrap';

const BlockSelectInput = ({
  options,
  value,
  onChange,
  disabled = false,
  multiple = false,
  required = false,
  blockWidth = 2
}) => {
  const onBlockClick = (e, option) => {
    if (disabled) return;

    let newValue;
    if (multiple) {
      newValue = Array.isArray(value) ? [...value] : [];
      if (newValue.includes(option)) {
        newValue.splice(newValue.findIndex(b => b === option), 1);
      } else {
        newValue.push(option);
      }
    } else {
      newValue = value === option ? null : option;
    }
    onChange(newValue);
  };

  const isSelected = option => {
    return multiple ? Array.isArray(value) && value.includes(option) : value === option;
  };

  return (
    <Row className="fg-blocks gap-1 w-100 m-0" disabled={disabled} data-required={required ? 'true' : 'false'}>
      {options.map((option, index) => (
        <Col
          className="block text-center no-float p-0"
          xs={6}
          sm={6}
          md={blockWidth}
          key={index}
          data-value={option}
          data-selected={isSelected(option) ? 'true' : 'false'}
        >
          <div
            onClick={e => onBlockClick(e, option)}
            className={`p-1 h-100 mid rounded ${!disabled ? 'hover-light' : ''} border border-primary ${
              isSelected(option) ? 'bg-primary' : disabled ? 'bg-secondary' : ''
            }`}
          >
            <p className={`mb-0 ${isSelected(option) ? 'text-white' : 'text-dark'}`}>{option}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default BlockSelectInput;
