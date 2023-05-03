import React from 'react';
import { Container } from 'react-bootstrap';
import JauntCard from '../JauntCard';

const Jaunts = ({ allJaunts, onJauntToBeDeletedChange, onJauntToBeEditedChange, editJauntStatus, showSteps }) => {
  return (
    <>
      <Container fluid className="px-5 my-4">
        {allJaunts.map(jaunt => (
          <JauntCard
            key={jaunt?.id}
            status={'Hello'}
            jaunt={jaunt}
            onDelete={() => onJauntToBeDeletedChange(jaunt)}
            onEdit={() => onJauntToBeEditedChange(jaunt)}
            editJauntStatus={editJauntStatus}
            showSteps={showSteps}
          />
        ))}
      </Container>
    </>
  );
};

export default Jaunts;
