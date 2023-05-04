import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FILTER_JAUNTS } from '../../helpers/constants';

const Filter = () => {
  const [filterValues, setFilterValues] = useState(cloneDeep([...FILTER_JAUNTS]));

  const findFilterValuesByParent = parentKey => {
    return filterValues.find(filterJaunt => filterJaunt?.key === parentKey);
  };

  const onParentFilterChange = parentKey => {
    const parentFilter = findFilterValuesByParent(parentKey);

    if (parentFilter?.children?.length) {
      parentFilter.children = [];
      setFilterValues([...filterValues.filter(fv => fv.key !== parentKey), parentFilter]);
    } else {
      parentFilter.children = [...FILTER_JAUNTS.find(fj => fj.key === parentKey)?.children];
      setFilterValues([...filterValues.filter(fv => fv.key !== parentKey), parentFilter]);
    }
  };

  const onChildrenFilterChange = (parentKey, childKey) => {
    const parentFilter = findFilterValuesByParent(parentKey);

    if (parentFilter?.children.includes(childKey)) {
      setFilterValues([
        ...filterValues.filter(fv => fv?.key !== parentKey),
        { ...parentFilter, children: [...parentFilter?.children.filter(c => c !== childKey)] }
      ]);
    } else {
      parentFilter.children.push(childKey);
      setFilterValues([...filterValues.filter(fv => fv?.key !== parentKey), { ...parentFilter }]);
    }
  };

  return (
    <>
      {FILTER_JAUNTS.map(parentFilter => {
        return (
          <div className="mt-4">
            <Form.Check
              type="checkbox"
              className="xxlarge font-weight-bold"
              label={parentFilter?.label}
              size="lg"
              onChange={() => onParentFilterChange(parentFilter?.key)}
              checked={parentFilter?.children?.length === findFilterValuesByParent(parentFilter?.key)?.children?.length}
            />
            <hr className="my-1" />
            <div className="d-flex ml-3 flex-wrap justify-content-start w-100">
              {parentFilter?.children.map(subFilter => {
                return (
                  <Form.Check
                    type="checkbox"
                    className="xlarge ml-3"
                    label={subFilter}
                    size="sm"
                    checked={findFilterValuesByParent(parentFilter?.key)?.children.includes(subFilter)}
                    onChange={() => onChildrenFilterChange(parentFilter?.key, subFilter)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="my-2 w-100 d-flex justify-content-end">
        <Button variant="primary">Apply</Button>
      </div>
    </>
  );
};

export default Filter;
