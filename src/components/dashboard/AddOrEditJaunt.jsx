import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SlidingSidebar from '../SlidingSideBar/SlidingSideBar';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { reorder } from '../../helpers/global';
import { GripHorizontal, Trash2Fill } from 'react-bootstrap-icons';

const AddOrEditJaunt = ({
  modalMetaData,
  onHide,
  inProgress,
  onAddOrEditJauntFieldValueChange,
  onAddJauntClick,
  onEditJauntClick,
  fields,
  handleStepToBeCompletedAddition,
  handleStepToBeCompletedDeletion
}) => {
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const [reorderedItem] = modalMetaData?.steps.splice(result.source.index, 1);
    modalMetaData.steps.splice(result.destination.index, 0, reorderedItem);

    onAddOrEditJauntFieldValueChange('steps', modalMetaData?.steps);
  }

  const getItemStyle = isDragging => {
    return isDragging;
  };

  return (
    <SlidingSidebar
      visible={modalMetaData !== null}
      onClose={onHide}
      title={`${modalMetaData?.id ? 'Edit' : 'Add'} Jaunt Information`}
      fullScreen
    >
      <Container fluid>
        {/* Thumbnail and Input Field Row */}

        <Row>
          <Col md={4} xs={12}>
            {/* Insert Thumbnail */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" />
            </Form.Group>
          </Col>

          <Col md={8} xs={12}>
            <Row>
              {fields.map(({ key, label, type, notRequired, as, options, columns }, index) => {
                return (
                  <>
                    <Col md={fields[index + 1]?.columns ? 12 - fields[index + 1]?.columns : columns || 12} xs={12}>
                      <Form.Group className="mb-2" key={key} id={`fp-form-${key}`}>
                        <Form.Label>
                          {label}
                          {!notRequired && <sup className="text-primary">*</sup>}
                        </Form.Label>
                        {type === 'dropDown' ? (
                          <Form.Control
                            type={type}
                            size="sm"
                            value={modalMetaData?.[key] || ''}
                            onChange={e => {
                              onAddOrEditJauntFieldValueChange(key, e.target.value);
                            }}
                            as={as}
                            rows={3}
                          >
                            {options.map(option => (
                              <option>{option}</option>
                            ))}
                          </Form.Control>
                        ) : (
                          <Form.Control
                            type={type}
                            size="sm"
                            value={modalMetaData?.[key] || ''}
                            onChange={e => {
                              onAddOrEditJauntFieldValueChange(key, e.target.value);
                            }}
                            as={as}
                            rows={3}
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </>
                );
              })}
            </Row>
          </Col>
        </Row>
        <hr />

        {/* Steps To Complete Row */}
        <div className="d-flex justify-content-start align-items-center flex-wrap mb-2">
          <h6 className="mt-1 xxlarge font-weight-bold">Steps To Complete</h6>
          <div className="d-flex align-items-center flex-grow-1">
            <Form.Group className="ml-2 w-100 mb-0">
              <Form.Control
                value={modalMetaData?.stepToBeCompleted}
                placeholder="Enter A Step"
                onChange={e => onAddOrEditJauntFieldValueChange('stepToBeCompleted', e.target.value)}
              />
            </Form.Group>
            <Button variant="primary ml-2" onClick={handleStepToBeCompletedAddition}>
              Add
            </Button>
          </div>
        </div>
        {/* Draggable Steps */}
        {modalMetaData?.steps?.length === 0 && <h6 className="mb-1 ml-2 small">No Steps Added</h6>}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {provided => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef} className="mt-2">
                  {modalMetaData?.steps?.map((step, index) => {
                    return (
                      <Draggable key={step?.id} draggableId={String(step?.id)} index={index}>
                        {(provided, snapshot) => (
                          <div
                            className={`my-2 py-2 ${getItemStyle(snapshot.isDragging) &&
                              'dragging-box'} draggable-box d-flex justify-content-between align-items-center px-2`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h6>
                              <GripHorizontal size={20} className="mr-2" />
                              {index + 1}.{'  '}
                              {step?.text}
                            </h6>
                            <Trash2Fill
                              className="text-primary pointer"
                              size={15}
                              title="Delete This Step"
                              onClick={() => handleStepToBeCompletedDeletion(step?.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>

        {/* Points Text Area */}
        <h6 className="mt-3 mb-3 xxlarge font-weight-bold">Points</h6>
        <Form.Group className="mb-3">
          <Form.Control
            as={'textarea'}
            rows={3}
            placeholder="Enter Points"
            value={modalMetaData?.points}
            onChange={e => onAddOrEditJauntFieldValueChange('points', e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-center align-items-center my-4">
          <Button variant="primary" onClick={modalMetaData?.id ? onEditJauntClick : onAddJauntClick}>
            {modalMetaData?.id ? 'Edit' : 'Add'}
          </Button>
        </div>
      </Container>
    </SlidingSidebar>
  );
};

export default AddOrEditJaunt;
