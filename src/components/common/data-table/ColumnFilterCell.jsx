import React, { useMemo } from 'react';
import { FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomMultiSelect from '../CustomMultiSelect';

const ColumnFilterCell = ({
  column: { key, type, searchOptions, isGroupedDropdown = false, isMultiSelect = false },
  filterValues = [],
  onColumnFilterChange
}) => {
  const filterValue = useMemo(() => filterValues.find(sv => sv.key === key), [filterValues, key]);

  const handleDateChange = dates => {
    const [start, end] = dates;
    onColumnFilterChange(key, { start, end });
  };

  if (type === 'date') {
    return (
      <DatePicker
        portalId="root"
        selectsRange
        startDate={filterValue?.value?.start}
        endDate={filterValue?.value?.end}
        onChange={handleDateChange}
        isClearable={true}
        dateFormat="MMM dd"
        wrapperClassName="d-block"
        className="form-control form-control-sm w-100 smallFont py-0"
      />
    );
  }

  if (searchOptions) {
    if (isGroupedDropdown) {
      return (
        <CustomMultiSelect
          items={searchOptions}
          onChange={values => onColumnFilterChange(key, values)}
          selectedItems={filterValue?.value}
          isMulti={false}
          isGroupped
          placeholder=""
          fieldColors={searchOptions.flatMap(o => o?.options)?.find(option => option?.value === filterValue?.value)}
          closeMenuOnSelect
          height="28px"
          isClearable
        />
      );
    }
    return (
      <CustomMultiSelect
        items={searchOptions}
        onChange={values => onColumnFilterChange(key, values)}
        selectedItems={filterValue?.value}
        maxToShow={0}
        isMulti={isMultiSelect}
        placeholder=""
        maxItemCustomMessage={length => `${length} item selected`}
        showMessageOnlyOnOverflow
        isClearable
        height="28px"
      />
    );
  }

  return (
    <FormControl
      className={`mb-0 text-dark px-2 py-0`}
      as={'input'}
      style={{
        fontSize: '12px',
        height: '30px'
      }}
      value={filterValue?.value || ''}
      onChange={e => onColumnFilterChange(key, e.target.value)}
      size="sm"
    />
  );
};

export default ColumnFilterCell;
