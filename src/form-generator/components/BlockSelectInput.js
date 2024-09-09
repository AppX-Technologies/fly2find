import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const BlockSelectInput = ({
  id,
  options,
  onChangeFunction,
  value: defaultValue = [],
  disabled = false,
  multiple = false,
  required = false,
  blockWidth = 3
}) => {
  const [selectedBlocks, setSelectedBlocks] = useState(
    Array.isArray(defaultValue) ? defaultValue : multiple ? [] : [defaultValue]
  );

  useEffect(() => {
    setSelectedBlocks(Array.isArray(defaultValue) ? defaultValue : multiple ? [] : [defaultValue]);
  }, [defaultValue, multiple]);

  useEffect(() => {
    if (onChangeFunction) {
      onChangeFunction(selectedBlocks);
    }
  }, [selectedBlocks]);

  const onBlockClick = option => {
    let newBlocks = [...selectedBlocks];
    if (newBlocks.includes(option)) {
      newBlocks = newBlocks.filter(block => block !== option);
    } else {
      if (multiple) {
        newBlocks.push(option);
      } else {
        newBlocks = [option];
      }
    }

    setSelectedBlocks(newBlocks);
  };

  return (
    <Row className="fg-blocks" disabled={disabled} id={`${id}-blocks`} data-required={required ? 'true' : 'false'}>
      {options.map((option, index) => (
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
            <p className={`mb-0 align-self-center ${selectedBlocks.includes(option) ? 'text-white' : 'text-dark'}`}>
              {option}
            </p>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default BlockSelectInput;
