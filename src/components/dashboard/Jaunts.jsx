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
  isEditable,
  statusUpdateInProcess,
  jauntThumbnailLoading
}) => {
  return (
    <>
      <Container fluid className="px-5 my-4">
        <Row>
          {allJaunts &&
            allJaunts.map((jaunt, index) => (
              <>
                <Col xs={12} md={6} lg={4} className="my-4">
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
                    statusUpdateInProcess={statusUpdateInProcess}
                    jauntThumbnailLoading={jauntThumbnailLoading}
                  />
                </Col>
              </>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Jaunts;
