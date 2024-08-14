import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { normalizeId } from '../helpers/utility';
import CheckBoxInput from './CheckBoxInput';

const CheckBoxGroup = ({
  id,
  groupName,
  options,
  className = '',
  defaultValues = [],
  onChange,
  title = '',
  disabled = false,
  preValue,
  boxWidth = 6,
  required = false,
  dependentElem,
  showDependentOn = ''
}) => {
  if (preValue) defaultValues = preValue;
  const groupId = groupName || id;

  //called after render only once
  useEffect(() => {
    internalOnChange();
  }, []);

  const showHideDependentElement = element => {
    let showElem = false;

    const radios = [...document.getElementsByName(groupId)];
    for (let index = 0; index < radios.length; index++) {
      const radio = radios[index];
      if (radio.checked && radio.value === showDependentOn) {
        showElem = true;
        break;
      }
    }

    if (showElem) {
      element.classList.remove('d-none');
      element.required = true;
    } else {
      element.classList.add('d-none');
      element.required = null;
    }
  };

  const internalOnChange = () => {
    //run internal functions here
    if (dependentElem) {
      const dependentElement = document.getElementById(dependentElem);
      dependentElement && showHideDependentElement(dependentElement);
    }

    if (onChange && window[onChange]) {
      window[onChange]();
    }
  };

  return (
    <Row className={'mb-4 ' + (required ? 'fg-checkbox-group' : '')} id={normalizeId(groupId)}>
      {options.map((option, index) => {
        const { option: label, value } = option;
        return (
          <Col key={index} xs={12} md={boxWidth}>
            <CheckBoxInput
              showLabel
              id={normalizeId(groupId + '-' + value)}
              key={index}
              label={label}
              groupName={groupId}
              defaultChecked={defaultValues.includes(value)}
              value={value}
              onChangeFunction={internalOnChange}
              className="ms-3"
              disabled={disabled}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default CheckBoxGroup;
