import { Badge } from 'react-bootstrap';
import { EnvelopeAt, Trash } from 'react-bootstrap-icons';
import { ADMIN_ROLE } from './constants';

export const getUserTableColumns = (onUserDeleteClick, sendPasswordResetLink) => {
  const allLabels = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      width: 100
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text',
      width: 100
    },
    {
      key: 'phone',
      label: 'Phone Number',
      type: 'text',
      width: 100
    },
    {
      key: 'role',
      label: 'Role',
      cellRenderer: user =>
        user.roles.map(r => (
          <Badge bg={r === ADMIN_ROLE ? 'dark' : 'primary'} className="mx-1">
            {r}
          </Badge>
        )),
      type: 'text',
      width: 100
    },
    {
      key: 'view',
      label: 'Action',
      cellRenderer: user => (
        <div className="d-flex justify-content-center align-items-center">
          <Trash
            className="text-dark hover hover-light mx-1"
            size={12}
            onClick={e => {
              onUserDeleteClick(user);
              e.stopPropagation();
            }}
          />
          <EnvelopeAt
            className="text-dark hover-light mx-1"
            size={12}
            onClick={e => {
              sendPasswordResetLink(user);
              e.stopPropagation();
            }}
          />{' '}
        </div>
      ),
      width: 160
    }
  ];
  return allLabels;
};
