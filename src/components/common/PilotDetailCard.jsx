import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import { pilotFields } from '../../helpers/constants';

export default function PilotDetailCard({ userDetails, onEdit }) {
  if (!userDetails || !userDetails.pilotProfile) {
    return <p>Loading...</p>;
  }

  const { pilotProfile } = userDetails;

  return (
    <div className="w-100 px-3 py-4 border-rounded mt-4">
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
                        <Badge key={index} bg="info" className=" px-2 py-2 m-1">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={key} className="py-0">
                  <td>{label}:</td>
                  <td>{value}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
    </div>
  );
}
