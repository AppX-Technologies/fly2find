import moment from 'moment';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const OverViewColumns = ({
  data,
  numRows = [],
  emailRows = [],
  priceFields = [],
  dateFields = [],
  fieldsToShow = [],
  md = 4,
  mt = 1,
  className = ''
}) => {
  const getValue = row => {
    if (emailRows.includes(row)) {
      return (
        <a onClick={e => e.stopPropagation()} className="text-secondary" href={`mailto:${data[row]}`}>
          {data[row]}
        </a>
      );
    }

    if (numRows.includes(row)) {
      return (
        <a onClick={e => e.stopPropagation()} className="text-secondary" href={`tel:${data[row]}`}>
          {data[row]}
        </a>
      );
    }
    if (dateFields.includes(row)) {
      return moment(data[row]).format('MMMM Do, YYYY');
    }

    if (priceFields.includes(row)) {
      return `$${data[row]}`;
    }
    return Array.isArray(data[row]) ? data[row].join(', ') : data[row];
  };

  return (
    <Row className={className}>
      {fieldsToShow.map(({ label, key }) => (
        <Col xs={12} md={md} className={`mt-${mt}`}>
          <p className="mb-0  text-secondary">
            <span className="text-dark">
              {label === 'Estimated Turnaround Time' ? 'Est. Turnaround Time' : label}:{' '}
            </span>
            {data[key] ? getValue(key) : 'N/A'}
          </p>
        </Col>
      ))}
    </Row>
  );
};

export default OverViewColumns;
