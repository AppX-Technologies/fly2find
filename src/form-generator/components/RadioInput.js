import React from 'react';
import { FormControl } from 'react-bootstrap';
import { normalizeId } from '../helpers/utility';

const RadioInput = ({
  id,
  title,
  groupName = '',
  defaultChecked,
  onChange,
  value,
  showLabel = false,
  className = '',
  label = '',
  groupID = ''
}) => {
  const inputId = id || normalizeId(`${groupID || groupName}-${value || title}`);
  return (
    <div className={'d-inline-flex ' + className}>
      <FormControl
        id={inputId}
        type="radio"
        name={groupName}
        style={styles.radio}
        defaultChecked={defaultChecked}
        onChange={onChange}
        value={value}
      />
      {showLabel && (
        <label htmlFor={inputId} className="ms-2 my-auto">
          {label || title}
        </label>
      )}
    </div>
  );
};

const styles = {
  radio: {
    height: 22,
    width: 22,
    margin: 'auto'
  }
};

export default RadioInput;
