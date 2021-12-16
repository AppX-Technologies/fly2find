import React, { useEffect } from 'react';
import { normalizeId } from '../helpers/utility';

const CheckBoxInput = ({
  id,
  title,
  groupName = '',
  defaultChecked,
  onChange,
  onChangeFunction,
  value,
  showLabel = false,
  className = '',
  label = '',
  required = false,
  preValue,
  onFormChange,
  disabled = false,
  boldLabel = false,
  size = 'lg'
}) => {
  useEffect(() => {
    internalOnChange(null, false);
  }, []);

  const internalOnChange = (e, checkForm = true) => {
    //run internal functions here
    if (checkForm && onFormChange) onFormChange();

    if (onChange && window[onChange]) {
      window[onChange](e);
    }
    if (onChangeFunction) {
      onChangeFunction(e);
    }
  };

  const inputId = id || normalizeId(groupName + '-' + (label || title));
  return (
    <div className={'form-check ' + className}>
      <input
        className="form-check-input"
        id={inputId}
        type="checkbox"
        name={groupName}
        style={size === 'sm' ? styles.checkboxsm : styles.checkbox}
        defaultChecked={preValue === null || preValue === undefined ? defaultChecked : preValue}
        onChange={internalOnChange}
        value={value || label}
        required={required}
        disabled={disabled}
      />
      {showLabel && (
        <label
          style={size === 'sm' ? { fontSize: 15 } : undefined}
          htmlFor={inputId}
          className="ml-2 form-check-label my-1"
        >
          {boldLabel ? <b>{label || title}</b> : label || title}
        </label>
      )}
    </div>
  );
};

const styles = {
  checkbox: {
    height: 22,
    width: 22
  },
  checkboxsm: {
    height: 18,
    width: 18
  }
};

export default CheckBoxInput;
