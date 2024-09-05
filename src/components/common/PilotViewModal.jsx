import React from 'react';
import { Button, Image, Row, Col, Badge, Table } from 'react-bootstrap';
import { Key } from 'react-bootstrap-icons';
import { render, Value } from 'sass';
import { pilotFields } from '../../helpers/constants';

export default function PilotViewModal({ userDetails, onEdit }) {
  if (!userDetails || !userDetails.pilotProfile) {
    return <p>Loading...</p>;
  }

  const { pilotProfile } = userDetails;

  const renderTable = () => (
    <Table className="table-no-side-borders" hover>
      <tbody>
        {pilotFields.map(({ key, label }) => {
          const value = pilotProfile[key];
          if (Array.isArray(value)) {
            return (
              <tr key={key}>
                <td style={{ fontWeight: 'unset' }}>{label}</td>
                <td>
                  <div className="d-flex flex-wrap">
                    {value.map((item, index) => (
                      <Badge key={index} className="badge-custom m-1 px-3 py-2">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </td>
              </tr>
            );
          } else {
            // Handling non-array values
            return (
              <tr key={key}>
                <td>{label}</td>
                <td>{value}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );

  return (
    <>
      <div>
        <div className="w-100 px-3 py-4 border-rounded mt-4">
          <div>{renderTable()}</div>
        </div>
      </div>
    </>
  );
}
