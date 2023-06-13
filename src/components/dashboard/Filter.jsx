import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { JAUNT_RELATED_FILTERS } from '../../helpers/constants';

const Filter = ({ onGlobalFilterValueChange, globalFilterValues, executeGlobalSearch, onHide }) => {
  const findFilterValuesByParent = parentKey => {
    return globalFilterValues?.filters?.find(filterJaunt => filterJaunt?.key === parentKey);
  };

  const onParentFilterChange = parentKey => {
    const parentFilter = findFilterValuesByParent(parentKey);

    if (parentFilter?.children?.length) {
      parentFilter.children = [];
      onGlobalFilterValueChange('filters', [
        ...globalFilterValues?.filters?.filter(fv => fv.key !== parentKey),
        parentFilter
      ]);
    } else {
      parentFilter.children = [...JAUNT_RELATED_FILTERS.find(fj => fj.key === parentKey)?.children];
      onGlobalFilterValueChange('filters', [
        ...globalFilterValues?.filters?.filter(fv => fv.key !== parentKey),
        parentFilter
      ]);
    }
  };

  const onChildrenFilterChange = (parentKey, childKey) => {
    const parentFilter = findFilterValuesByParent(parentKey);

    if (parentFilter?.children.includes(childKey)) {
      onGlobalFilterValueChange('filters', [
        ...globalFilterValues?.filters?.filter(fv => fv?.key !== parentKey),
        { ...parentFilter, children: [...parentFilter?.children.filter(c => c !== childKey)] }
      ]);
    } else {
      parentFilter.children.push(childKey);
      onGlobalFilterValueChange('filters', [
        ...globalFilterValues?.filters?.filter(fv => fv?.key !== parentKey),
        { ...parentFilter }
      ]);
    }
  };

  useEffect(() => {
    onGlobalFilterValueChange('filters', cloneDeep([...JAUNT_RELATED_FILTERS]));
  }, [JAUNT_RELATED_FILTERS]);

  return (
    <>
      {JAUNT_RELATED_FILTERS.map(parentFilter => {
        return (
          <div className="mt-2" key={parentFilter?.key}>
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
                    key={subFilter}
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

      <div className="my-2 w-100 d-flex justify-content-center">
        <Button
          variant="primary"
          onClick={() => {
            executeGlobalSearch();
            onHide();
          }}
        >
          Apply
        </Button>
      </div>
    </>
  );
};

export default Filter;
