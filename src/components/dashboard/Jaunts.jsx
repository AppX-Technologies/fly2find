import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import JauntCard from '../JauntCard';

const Jaunts = ({
  allJaunts = [],
  onJauntToBeDeletedChange,
  onJauntToBeEditedChange,
  editJauntStatus,
  showSteps,
  onShowStepsChange,
  isDeletable,
  isEditable
}) => {
  return (
    <>
      <Container fluid className="px-5 my-4">
        <Row className="gx-5 ">
          {allJaunts &&
            allJaunts.map(jaunt => (
              <Col xs={10} md={5} lg={3} className="mx-auto">
                <JauntCard
                  key={jaunt?.id}
                  jaunt={jaunt}
                  onDelete={() => onJauntToBeDeletedChange(jaunt)}
                  onEdit={() => onJauntToBeEditedChange(jaunt)}
                  editJauntStatus={editJauntStatus}
                  showSteps={showSteps}
                  onShowStepsChange={onShowStepsChange}
                  isDeletable={isDeletable}
                  isEditable={isEditable}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Jaunts;
