import React, { useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { mapFieldToElement } from '../helpers/TypeToElemMapper';
import { DashCircleFill, PlusCircleFill } from 'react-bootstrap-icons';
import { normalizeId } from '../helpers/utility';

const TableInput = ({
  id,
  title,
  tableFields: fields,
  initialRowCount = 1,
  className = '',
  preValue,
  onFormChange
}) => {
  const [rowCount, setRowCount] = useState(preValue ? preValue.length : initialRowCount);

  const tableId = id;

  const removeRow = () => {
    if (rowCount > 1) {
      setRowCount(rowCount - 1);
    }
  };
  const addRow = () => {
    setRowCount(rowCount + 1);
  };

  const roundedHeader = index => {
    let className = '';
    if (index === 0) {
      className += ' rounded-left';
    }

    if (index === fields.length) {
      className += ' rounded-right';
    }
    return className;
  };

  const createTableRows = rowCount => {
    let tempRows = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      tempRows.push(createSingleRow(rowIndex));
    }

    return tempRows;
  };

  const createSingleRow = rowIndex => {
    return (
      <tr key={rowIndex}>
        {fields.map((field, index) => (
          <td key={index} className={roundedHeader(index)}>
            {mapFieldToElement({
              ...field,
              id: normalizeId(tableId + '-' + field.title + '-' + rowIndex),
              preValue: preValue && preValue[rowIndex] ? preValue[rowIndex][index] : null,
              onFormChange
            })}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <>
      <Table id={tableId} bordered className={'rounded ' + className} responsive>
        {/* mapping header */}
        <thead>
          <tr className="bg-primary text-white">
            {fields.map((field, index) => (
              <th key={index} className={`${roundedHeader(index)} text-center`}>
                {field.title}
              </th>
            ))}
          </tr>
        </thead>
        {/* mapping inputs */}
        <tbody>{createTableRows(rowCount)}</tbody>
      </Table>
      <Row className="float-md-right">
        <Col xs={12}>
          <Button
            variant="outline-success"
            onClick={() => {
              addRow();
            }}
          >
            <PlusCircleFill className="align-text-top" /> Add a row
          </Button>{' '}
          {rowCount > 1 && (
            <Button
              className="ms-md-3 mt-0"
              variant="outline-danger"
              onClick={() => {
                removeRow();
              }}
            >
              <DashCircleFill className="align-text-top" /> Delete a row
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default TableInput;
