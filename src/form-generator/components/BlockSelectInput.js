import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const BlockSelectInput = ({
  id,
  options,
  onChange = '',
  value: defaultValue = '',
  preValue,
  onFormChange,
  disabled = false,
  onChangeFunction,
  multiple,
  required,
  blockWidth = 3
}) => {
  const [selectedBlocks, setSelectedBlocks] = useState(
    preValue || defaultValue ? (multiple ? [...(preValue || defaultValue)] : [preValue || defaultValue]) : []
  );

  //called after render only once
  useEffect(() => {
    internalOnChange(null, false);
  }, [selectedBlocks]);

  const internalOnChange = (e, checkForm = true) => {
    if (checkForm && onFormChange) onFormChange(e);

    if (onChange && window[onChange]) {
      window[onChange](e, selectedBlocks);
    }

    if (onChangeFunction) onChangeFunction(e, selectedBlocks);
  };

  const onBlockClick = option => {
    let newBlocks = [...selectedBlocks];
    if (newBlocks.includes(option)) {
      newBlocks.splice(newBlocks.findIndex(b => b === option), 1);
    } else {
      if (multiple) {
        newBlocks.push(option);
      } else {
        newBlocks = [option];
      }
    }

    setSelectedBlocks([...newBlocks]);
  };

  return (
    <Row
      className="fg-blocks"
      disabled={disabled}
      id={`${id}-blocks`}
      onChange={internalOnChange}
      data-required={required ? 'true' : 'false'}
    >
      {options.map((option, index) => {
        return (
          <Col
            className="block mt-3 text-center no-float"
            xs={6}
            sm={6}
            md={blockWidth}
            key={index}
            data-value={option}
            data-selected={selectedBlocks.includes(option) ? 'true' : 'false'}
          >
            <div
              onClick={() => onBlockClick(option)}
              className={`p-2 h-100 d-flex justify-content-center rounded hover-light border border-info ${
                selectedBlocks.includes(option) ? 'bg-info' : ''
              }`}
            >
              <p className={`mb-0 align-self-center ${selectedBlocks.includes(option) ? 'text-white' : 'text-dark'}`}>{option}</p>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default BlockSelectInput;
