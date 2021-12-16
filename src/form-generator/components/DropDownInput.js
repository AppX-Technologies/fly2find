import React, { useEffect } from 'react';

const DropDownInput = ({
  id,
  options = [],
  title,
  className = '',
  onChange = '',
  value: defaultValue = '',
  preValue,
  onFormChange,
  disabled = false,
  compact = false,
  onChangeFunction,
  dependentElem,
  showDependentOn = ''
}) => {
  if (preValue) defaultValue = preValue;
  //called after render only once
  useEffect(() => {
    internalOnChange(null, false);
  }, []);

  const showHideDependentElement = (e, dependentElement) => {
    const value = e ? e.target.value : document.getElementById('UnderwriterCertification').value;

    const showElem = value === showDependentOn;

    if (showElem) {
      dependentElement.classList.remove('d-none');
      dependentElement.required = true;
    } else {
      dependentElement.classList.add('d-none');
      dependentElement.required = null;
    }
  };

  const internalOnChange = (e, checkForm = true) => {
    if (checkForm && onFormChange) onFormChange(e);

    if (dependentElem) {
      const dependentElement = document.getElementById(dependentElem);
      dependentElement && showHideDependentElement(e, dependentElement);
    }

    if (onChange && window[onChange]) {
      window[onChange](e);
    }

    if (onChangeFunction) onChangeFunction(e);
  };

  return (
    <select
      disabled={disabled}
      defaultValue={defaultValue}
      className={'form-control ' + className}
      id={id}
      onChange={internalOnChange}
      style={compact ? { height: '30px' } : undefined}
    >
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default DropDownInput;
