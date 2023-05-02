import React from 'react';
import CrudCard from '../CrudCard';
import { Container } from 'react-bootstrap';

const Jaunts = ({ allJaunts }) => {
  return (
    <>
      <Container fluid className="px-5 my-4">
        {allJaunts.map(jaunt => (
          <CrudCard status={'Hello'} jaunt={jaunt} />
        ))}
      </Container>
    </>
  );
};

export default Jaunts;
