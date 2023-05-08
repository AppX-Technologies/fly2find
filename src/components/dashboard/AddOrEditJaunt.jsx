import React, { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { GripHorizontal, TrashFill, X } from 'react-bootstrap-icons';
import { ADMIN_ROLE, acceptedImageTypes } from '../../helpers/constants';
import SlidingSidebar from '../SlidingSideBar/SlidingSideBar';
import DriveFileUploader from '../drive-file-uploader';
import { isFileUploadingInProcess } from '../../helpers/global';

const AddOrEditJaunt = ({
  modalMetaData,
  onHide,
  inProgress,
  onAddOrEditJauntFieldValueChange,
  onAddJauntClick,
  onEditJauntClick,
  fields,
  handleStepToBeCompletedAddition,
  handleStepToBeCompletedDeletion,
  onThumbnailChange,
  onAlbumChange,
  onNumberOfFilesChange,
  numberOfFiles,
  isEditable
}) => {
  const { role } = JSON.parse(localStorage.getItem('user'));
  const [showNotEditableInfo, setShowNonEditableInfo] = useState();

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const [reorderedItem] = modalMetaData?.steps.splice(result.source.index, 1);
    modalMetaData.steps.splice(result.destination.index, 0, reorderedItem);

    onAddOrEditJauntFieldValueChange('steps', modalMetaData?.steps);
  }

  const getItemStyle = isDragging => {
    return isDragging;
  };

  const filteredFields = useMemo(() => {
    return fields?.filter(({ key }) => (role !== ADMIN_ROLE ? key !== 'status' : true));
  }, [fields]);

  useEffect(() => {
    setShowNonEditableInfo(!isEditable);
  }, [isEditable]);

  return (
    <SlidingSidebar
      visible={modalMetaData !== null}
      onClose={onHide}
      title={`${modalMetaData?.id ? 'Edit' : 'Add'} Jaunt Information`}
      fullScreen
    >
      {showNotEditableInfo && (
        <Alert variant="danger" className="p-1 w-100 mt-1 mb-3">
          <div className="d-flex ">
            <p className="ml-1 text-center flex-grow-1 align-items-center m-auto">
              As This Jaunt Is Not In Draft Phase So It Cannot Be Edited By You.
            </p>
            <X size={30} className="mr-1 pointer" onClick={() => setShowNonEditableInfo(false)} />
          </div>
        </Alert>
      )}
      <Container fluid>
        {/* Thumbnail and Input Field Row */}

        <Row>
          <Col md={3} xs={12} className="my-auto h-100 mx-auto">
            {/* Insert Thumbnail */}
            <div className="d-flex justify-content-center align-items-center">
              {!modalMetaData?.thumbnail?.length ? (
                <>
                  {isEditable && (
                    <DriveFileUploader
                      onUploadedFilesChange={onThumbnailChange}
                      multiple={false}
                      id="thumbnail"
                      allowedFileTypes={acceptedImageTypes}
                      fileNotSuitableError={'Only Images Can Be Uploaded'}
                      isDisabled={!inProgress}
                      accept="image/*"
                    />
                  )}
                </>
              ) : (
                <div className="d-flex justify-content-center">
                  <Image
                    src={modalMetaData?.thumbnail}
                    className="internal-thumbnail-images mt-2 pointer"
                    onClick={() => window.open(modalMetaData?.thumbnail, '_blank')}
                  />
                  {isEditable && (
                    <TrashFill
                      className="text-primary pointer "
                      size={17}
                      title="Delete This Thumbnail"
                      onClick={() => onThumbnailChange('')}
                    />
                  )}
                </div>
              )}
            </div>
          </Col>

          <Col md={9} xs={12}>
            <Row>
              {filteredFields?.map(({ key, label, type, notRequired, as, options, columns }, index) => {
                return (
                  <>
                    <Col
                      md={filteredFields[index + 1]?.columns ? 12 - filteredFields[index + 1]?.columns : columns ?? 12}
                      xs={12}
                    >
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
                            disabled={!isEditable || (key === 'status' && role !== ADMIN_ROLE) || inProgress}
                          >
                            {options.map(option => (
                              <option disabled={modalMetaData?.[key] === option}>{option}</option>
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
                            rows={4}
                            disabled={!isEditable || inProgress}
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

        {/* Albums Row */}

        <div className="d-flex justify-content-between align-items-center">
          <h6 className="xxlarge font-weight-bold">Albums</h6>
          {isFileUploadingInProcess(numberOfFiles) && (
            <h6 className="xxlarge font-weight-bold m-0">
              {`(${numberOfFiles?.alreadyUploaded} / ${numberOfFiles?.toBeUploaded}) Completed`}
            </h6>
          )}
        </div>
        <div className="d-flex justify-content-start my-2 w-100 album-section">
          {isEditable && (
            <DriveFileUploader
              onUploadedFilesChange={onAlbumChange}
              id="album"
              accept="image/*"
              onNumberOfFilesChange={onNumberOfFilesChange}
              allowedFileTypes={acceptedImageTypes}
              fileNotSuitableError={'Only Images Can Be Uploaded'}
              isDisabled={!isEditable || inProgress}
            />
          )}

          <div className="d-flex justify-content-start ml-4">
            {modalMetaData?.album &&
              modalMetaData?.album?.map(file => {
                return (
                  <div className="d-flex justify-content-center mx-2">
                    <Image
                      src={file}
                      className="internal-thumbnail-images mt-2 pointer"
                      onClick={() => window.open(file, '_blank')}
                    />
                    {isEditable && (
                      <TrashFill
                        className="text-primary pointer "
                        size={17}
                        title="Delete This Image"
                        onClick={() => onAlbumChange(file, false)}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <hr />

        {/* Steps To Complete Row */}
        <div className="mt-2">
          <h6 className="xxlarge font-weight-bold">Steps To Complete</h6>
        </div>

        {/* Draggable Steps */}
        {modalMetaData?.steps?.length === 0 && <h6 className="my-2 ml-2 small">No Steps Added Yet</h6>}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {provided => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef} className="mt-2">
                  {modalMetaData?.steps?.map((step, index) => {
                    return (
                      <Draggable
                        key={step?.id}
                        draggableId={String(step?.id)}
                        index={index}
                        isDragDisabled={!isEditable}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={`my-2 py-2 ${getItemStyle(snapshot.isDragging) &&
                              'dragging-box'} draggable-box d-flex justify-content-between align-items-center px-2`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h6>
                              {isEditable && <GripHorizontal size={20} className="mr-2" />}
                              {index + 1}.{'  '}
                              {step?.text}
                            </h6>
                            {isEditable && (
                              <TrashFill
                                className="text-primary pointer steps-delete"
                                size={15}
                                title="Delete This Step"
                                onClick={() => handleStepToBeCompletedDeletion(step?.id)}
                              />
                            )}
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
        {isEditable && (
          <>
            <div className="d-flex align-items-center w-100 my-2">
              <Form.Group className=" w-100 mb-0">
                <Form.Control
                  value={modalMetaData?.stepToBeCompleted}
                  placeholder="Enter A Step"
                  onChange={e => onAddOrEditJauntFieldValueChange('stepToBeCompleted', e.target.value)}
                />
              </Form.Group>
              <Button variant="primary ml-2" onClick={handleStepToBeCompletedAddition} disabled={inProgress}>
                Add
              </Button>
            </div>
            <hr />
          </>
        )}

        {/* Points Text Area */}
        <h6 className="mt-2 mb-3 xxlarge font-weight-bold">Points</h6>
        <Form.Group className="mb-3 mt-2">
          <Form.Control
            as={'textarea'}
            rows={3}
            placeholder="Enter Points"
            value={modalMetaData?.points || ''}
            onChange={e => onAddOrEditJauntFieldValueChange('points', e.target.value)}
            disabled={!isEditable}
          />
        </Form.Group>
        {isEditable && (
          <div className="d-flex justify-content-center align-items-center my-4">
            <Button
              variant="primary"
              onClick={modalMetaData?.id ? onEditJauntClick : onAddJauntClick}
              disabled={inProgress}
            >
              {modalMetaData?.id ? 'Edit' : 'Add'}
            </Button>
          </div>
        )}
      </Container>
    </SlidingSidebar>
  );
};

export default AddOrEditJaunt;
