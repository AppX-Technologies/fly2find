import React from 'react';
import { Container } from 'react-bootstrap';
import CrudCard from '../CrudCard';

const Jaunts = ({ allJaunts, onJauntToBeDeletedChange, onJauntToBeEditedChange }) => {
  return (
    <>
      <Container fluid className="px-5 my-4">
        {allJaunts.map(jaunt => (
          <CrudCard
            status={'Hello'}
            jaunt={jaunt}
            onDelete={() => onJauntToBeDeletedChange(jaunt)}
            onEdit={() => onJauntToBeEditedChange(jaunt)}
          />
        ))}
      </Container>
    </>
  );
};

export default Jaunts;
