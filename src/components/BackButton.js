import React from 'react';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useHistory } from 'react-router';

const BackButton = ({ backPath }) => {
  const history = useHistory();

  const onClick = () => {
    history.push(backPath);
  };

  return (
    <Button onClick={onClick} variant="danger" size="sm">
      <ArrowLeft size={20} className="align-text-top" /> <span className="d-none d-md-inline">Back</span>
    </Button>
  );
};

export default BackButton;
