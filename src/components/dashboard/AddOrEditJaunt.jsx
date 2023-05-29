import React, { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { GripHorizontal, TrashFill, X } from 'react-bootstrap-icons';
import { ADMIN_ROLE, acceptedImageTypes } from '../../helpers/constants';
import SlidingSidebar from '../SlidingSideBar/SlidingSideBar';
import DriveFileUploader from '../drive-file-uploader';
import { isFileUploadingInProcess } from '../../helpers/global';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

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
  const { user, onUserChange } = useContext(UserContext);
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
    return fields?.filter(({ key }) => (user?.role !== ADMIN_ROLE ? key !== 'status' : true));
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
      underlinedTitle={true}
      buttonDisabled={inProgress || isFileUploadingInProcess(numberOfFiles)}
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

        <Row className="mb-2">
          <Col md={3} xs={12} className="my-auto h-100 mx-auto">
            {/* Insert Thumbnail */}
            <div className="d-flex justify-content-center align-items-center">
              {!modalMetaData?.thumbnail?.fileId ? (
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
                <>
                  {!modalMetaData?.thumbnail?.src ? (
                    <div className="rectangular-skeleton-small"></div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <Image
                        src={modalMetaData?.thumbnail?.src || modalMetaData?.thumbnail?.tempSrc} // use modalMetadata?.thumbnail?.fileId
                        className="internal-thumbnail-images mt-2 pointer"
                        onClick={() =>
                          window.open(modalMetaData?.thumbnail?.src || modalMetaData?.thumbnail?.tempSrc, '_blank')
                        }
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
                </>
              )}
            </div>
          </Col>

          <Col md={9} xs={12}>
            <Row>
              {filteredFields?.map(({ key, label, type, notRequired, as, options, columns }, index) => {
                return (
                  <Col
                    key={key}
                    md={filteredFields[index + 1]?.columns ? 12 - filteredFields[index + 1]?.columns : columns ?? 12}
                    xs={12}
                  >
                    <Form.Group className="mb-2" id={`fp-form-${key}`}>
                      <Form.Label className="m-0 font-weight-bold">
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
                          disabled={!isEditable || (key === 'status' && user?.role !== ADMIN_ROLE) || inProgress}
                        >
                          {options.map(option => (
                            <option key={option} disabled={modalMetaData?.[key] === option}>
                              {option}
                            </option>
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
                          disabled={!isEditable || inProgress}
                        />
                      )}
                    </Form.Group>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <hr />

        {/* Description Row */}

        <div className="mt-2">
          <h6 className="xxlarge font-weight-bold">
            Description
            <sup className="text-primary">*</sup>
          </h6>
        </div>
        <div className="my-2 px-1">
          <Form.Group className="w-100">
            <Form.Control
              type="text"
              size="sm"
              value={modalMetaData?.description || ''}
              onChange={e => {
                onAddOrEditJauntFieldValueChange('description', e.target.value);
              }}
              as={'textarea'}
              rows={13}
              disabled={!isEditable || inProgress}
            />
          </Form.Group>
        </div>
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
        <div className="d-flex justify-content-start  mb-2 w-100 album-section">
          {isEditable && !inProgress && (
            <DriveFileUploader
              onUploadedFilesChange={onAlbumChange}
              id="album"
              accept="image/*"
              onNumberOfFilesChange={onNumberOfFilesChange}
              allowedFileTypes={acceptedImageTypes}
              fileNotSuitableError={'Only Images Can Be Uploaded'}
            />
          )}

          <div className="d-flex justify-content-start ml-4">
            {modalMetaData?.album &&
              modalMetaData?.album?.map(file => {
                return (
                  <div className="d-flex justify-content-center mx-2" key={file?.src}>
                    {file?.src ? (
                      <>
                        <Image
                          src={file?.src}
                          className="internal-thumbnail-images mt-2 pointer"
                          onClick={() => window.open(file?.src, '_blank')}
                        />
                        {isEditable && (
                          <TrashFill
                            className="text-primary pointer "
                            size={17}
                            title="Delete This Image"
                            onClick={() => onAlbumChange(file, false)}
                          />
                        )}
                      </>
                    ) : (
                      <div className="rectangular-skeleton-small" />
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
        <h6 className="mt-2 xxlarge font-weight-bold">
          Points <sup className="text-primary">*</sup>
        </h6>
        <Form.Group className="mb-3 ">
          <Form.Control
            as={'textarea'}
            rows={3}
            placeholder="Enter Points"
            value={modalMetaData?.points || ''}
            onChange={e => onAddOrEditJauntFieldValueChange('points', e.target.value)}
            disabled={!isEditable || inProgress}
          />
        </Form.Group>
        {isEditable && (
          <div className="d-flex justify-content-center align-items-center my-4">
            <Button
              variant="primary"
              onClick={modalMetaData?.id ? onEditJauntClick : onAddJauntClick}
              disabled={inProgress || isFileUploadingInProcess(numberOfFiles)}
            >
              {modalMetaData?.id ? (inProgress ? 'Editing...' : 'Edit') : inProgress ? 'Adding...' : 'Add'}
            </Button>
          </div>
        )}
      </Container>
    </SlidingSidebar>
  );
};

export default AddOrEditJaunt;
