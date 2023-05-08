import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons/dist';
import { toast } from 'react-toastify';
import { ADMIN_ROLE, DRAFT_STATUS, JAUNTS, PILOT_ROLE } from '../../helpers/constants';
import { ADD_JAUNT_FIELDS, EDIT_JAUNT_FIELD } from '../../helpers/forms';
import AlertModal from '../AlertModal';
import FloatingButton from '../FloatingButton';
import SlidingSideBar from '../SlidingSideBar/SlidingSideBar';
import AddOrEditJaunt from './AddOrEditJaunt';
import Filter from './Filter';
import Jaunts from './Jaunts';
import SecondaryHeader from './SecondaryHeader';
import { findSpecificJaunt, generateRandomUUID } from '../../helpers/global';

const generateRandomUUIDForAllJauntSteps = jaunts => {
  return [
    ...jaunts.map(jaunt => ({
      ...jaunt,
      steps: [...jaunt.steps.map(step => ({ id: generateRandomUUID(), text: step }))]
    }))
  ];
};

const Index = () => {
  const [addOrEditJauntMetadata, setAddOrEditJauntMetadata] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [allJaunts, setAllJaunts] = useState([]);
  const [jauntToBeDeleted, setJauntToBeDeleted] = useState(null);
  const [showSteps, setShowSteps] = useState([]);
  const [jauntAddOrUpdateInProgress, setJauntAddOrUpdateInProgress] = useState(false);
  const [jauntDeleteInProgress, setJauntDeleteInProgress] = useState(false);
  const [numberOfFiles, setNumberOfFiles] = useState({
    toBeUploaded: 0,
    alreadyUploaded: 0
  });
  const [globalFilterValues, setGlobalFilterValues] = useState({
    query: '',
    showing: 'All',
    sortBy: '',
    isAssessending: true
  });

  const { role, email } = JSON.parse(localStorage.getItem('user')) || {};

  const onNumberOfFilesChange = (key, value, reset = false) => {
    if (reset) {
      numberOfFiles.toBeUploaded = 0;
      numberOfFiles.alreadyUploaded = 0;
      setNumberOfFiles({ ...numberOfFiles });
      return;
    }

    if (key === 'toBeUploaded') {
      numberOfFiles[key] = value;
    } else {
      numberOfFiles[key] = numberOfFiles[key] + value;
    }
    setNumberOfFiles({ ...numberOfFiles });
  };

  const onThumbnailChange = file => {
    onAddOrEditJauntFieldValueChange('thumbnail', file);
  };

  const onAlbumChange = (file, add = true) => {
    if (add) {
      addOrEditJauntMetadata.album.push(file);
      setAddOrEditJauntMetadata(prevData => ({ ...prevData }));
    } else {
      addOrEditJauntMetadata.album.splice(addOrEditJauntMetadata.album.indexOf(file), 1);
      setAddOrEditJauntMetadata(prevData => ({ ...prevData }));
    }
  };

  const onGlobalFilterValueChange = (key, value) => {
    globalFilterValues[key] = value;
    setGlobalFilterValues({ ...globalFilterValues });
  };

  const onJauntToBeDeletedChange = value => {
    setJauntToBeDeleted(value);
  };

  const onAddOrEditJauntModalClose = () => {
    setAddOrEditJauntMetadata(null);
  };

  const handleStepToBeCompletedAddition = () => {
    if (!addOrEditJauntMetadata?.stepToBeCompleted) {
      return toast.error('Please Enter Step To Add.');
    }
    addOrEditJauntMetadata.steps.push({
      text: addOrEditJauntMetadata?.stepToBeCompleted,
      id: generateRandomUUID()
    });
    onAddOrEditJauntFieldValueChange('steps', addOrEditJauntMetadata?.steps);

    onAddOrEditJauntFieldValueChange('stepToBeCompleted', '');
  };

  const handleStepToBeCompletedDeletion = stepId => {
    onAddOrEditJauntFieldValueChange('steps', [...addOrEditJauntMetadata?.steps.filter(step => step?.id !== stepId)]);
  };

  const onAddOrEditJauntFieldValueChange = (key, value) => {
    addOrEditJauntMetadata[key] = value;
    setAddOrEditJauntMetadata({ ...addOrEditJauntMetadata });
  };

  const onJauntToBeEditedChange = value => {
    setAddOrEditJauntMetadata(cloneDeep({ ...value, album: value?.album || [] }));
  };

  const onFilterValueChange = value => {
    setShowFilter(value);
  };

  // Triggers When Add Button Is Clicked Inside The SlidingSidebar

  const onAddJauntClick = () => {
    const emptyField = ADD_JAUNT_FIELDS.find(jaunt => !addOrEditJauntMetadata[(jaunt?.key)]);

    if (emptyField) {
      return toast.error(`${emptyField?.label} Field Cannot Be Empty`);
    }
    setJauntAddOrUpdateInProgress(true);
    // const { error, response } = await makeApiRequests({
    //   requestType: 'upload-file',
    //   requestBody: { payload: fileInfoObject }
    // });

    // if (error) {
    //   return toast.error(error);
    // }

    setAllJaunts([...allJaunts, { ...addOrEditJauntMetadata, id: allJaunts?.length + 1, status: 'Draft' }]); // Use UUID instead
    onAddOrEditJauntModalClose();
    setJauntAddOrUpdateInProgress(false);
    toast.success('Jaunt Successfully Created');
  };

  // Triggers When Edit Button Is Clicked Inside The SlidingSidebar

  const onEditJauntClick = () => {
    const emptyField = ADD_JAUNT_FIELDS.find(jaunt => !addOrEditJauntMetadata[(jaunt?.key)]);

    if (emptyField) {
      return toast.error(`${emptyField?.label} Field Cannot Be Empty`);
    }
    setJauntAddOrUpdateInProgress(false);

    // const { error, response } = await makeApiRequests({
    //   requestType: 'upload-file',
    //   requestBody: { payload: fileInfoObject }
    // });

    // if (error) {
    //   return toast.error(error);
    // }

    const toEditJauntIndex = allJaunts.findIndex(jaunt => jaunt?.id === addOrEditJauntMetadata?.id);
    allJaunts[toEditJauntIndex] = addOrEditJauntMetadata;
    setAllJaunts([...allJaunts]);
    onAddOrEditJauntModalClose();
    setJauntAddOrUpdateInProgress(false);
    toast.success('Jaunt Successfully Edited');
  };

  // Triggers When Delete Button Is Clicked In The Card

  const onDeleteJauntClick = () => {
    setJauntDeleteInProgress(true);
    // const { error, response } = await makeApiRequests({
    //   requestType: 'upload-file',
    //   requestBody: { payload: fileInfoObject }
    // });

    // if (error) {
    //   return toast.error(error);
    // }

    const toDeleteJauntIndex = allJaunts.findIndex(jaunt => jaunt?.id === jauntToBeDeleted?.id);
    allJaunts.splice(toDeleteJauntIndex, 1);
    setAllJaunts([...allJaunts]);
    setJauntToBeDeleted(null);
    setJauntDeleteInProgress(false);
    toast.success('Jaunt Successfully Deleted');
  };

  // Edit Status of A Jaunt From Card

  const editJauntStatus = (jauntId, status) => {
    const toEditJauntIndex = allJaunts.findIndex(jaunt => jaunt?.id === jauntId);
    allJaunts[toEditJauntIndex] = { ...allJaunts[toEditJauntIndex], status };
    setAllJaunts([...allJaunts]);
  };

  const onShowStepsChange = jauntId => {
    if (showSteps.includes(jauntId)) {
      setShowSteps([...showSteps.filter(jaunt => jaunt !== jauntId)]);
    } else {
      setShowSteps([...showSteps, jauntId]);
    }
  };

  const isJauntDeletable = jauntId => {
    if (
      role === ADMIN_ROLE ||
      (role === PILOT_ROLE && findSpecificJaunt(allJaunts, jauntId)?.status === DRAFT_STATUS)
    ) {
      return true;
    }
    return false;
  };

  const executeGlobalSearch = () => {
    // const { error, response } = await makeApiRequests({
    //   requestType: 'upload-file',
    //   requestBody: { payload: fileInfoObject }
    // });
    // if (error) {
    //   return toast.error(error);
    // }
    // setAllJaunts({ ...allJaunts });
  };

  useEffect(() => {
    setShowSteps([...allJaunts.map(({ id }) => id)]);
  }, [allJaunts]);

  useEffect(() => {
    if (!addOrEditJauntMetadata) {
      onNumberOfFilesChange(0);
    }
  }, [addOrEditJauntMetadata]);

  useEffect(() => {
    setAllJaunts(generateRandomUUIDForAllJauntSteps(JAUNTS));
  }, [JAUNTS]);

  useEffect(() => {
    executeGlobalSearch();
  }, [globalFilterValues.showing, globalFilterValues.isAssessending, globalFilterValues.sortBy]);

  return (
    <>
      <AlertModal
        show={jauntToBeDeleted}
        alertText={'Are You Sure You Want To Delete This Jaunt?'}
        onContinueClick={() => onDeleteJauntClick()}
        onDismissClick={() => onJauntToBeDeletedChange(null)}
        showProgress={jauntDeleteInProgress}
        title="Delete This Jaunt"
        progressText="Deleting..."
      />

      {/* Sidebar For Filter */}
      <SlidingSideBar visible={showFilter} onClose={() => onFilterValueChange(false)} title="Filter">
        <Filter onGlobalFilterValueChange={onGlobalFilterValueChange} globalFilterValues={globalFilterValues} />
      </SlidingSideBar>

      <FloatingButton
        text="Add Jaunt"
        icon={<PlusCircleFill size={15} className="mr-1" />}
        onClick={() => setAddOrEditJauntMetadata({ steps: [], album: [] })}
        variant="dark"
      />
      <SecondaryHeader
        onFilterValueChange={onFilterValueChange}
        onGlobalFilterValueChange={onGlobalFilterValueChange}
        globalFilterValues={globalFilterValues}
        executeGlobalSearch={executeGlobalSearch}
      />
      <AddOrEditJaunt
        modalMetaData={addOrEditJauntMetadata}
        fields={
          addOrEditJauntMetadata?.id
            ? EDIT_JAUNT_FIELD?.filter(({ key }) => key !== 'points' && key !== 'thumbnail')
            : ADD_JAUNT_FIELDS?.filter(({ key }) => key !== 'points' && key !== 'thumbnail')
        }
        onHide={onAddOrEditJauntModalClose}
        onAddOrEditJauntFieldValueChange={onAddOrEditJauntFieldValueChange}
        onAddJauntClick={onAddJauntClick}
        onEditJauntClick={onEditJauntClick}
        handleStepToBeCompletedAddition={handleStepToBeCompletedAddition}
        handleStepToBeCompletedDeletion={handleStepToBeCompletedDeletion}
        onThumbnailChange={onThumbnailChange}
        onAlbumChange={onAlbumChange}
        onNumberOfFilesChange={onNumberOfFilesChange}
        inProgress={jauntAddOrUpdateInProgress}
        numberOfFiles={numberOfFiles}
        isEditable={
          addOrEditJauntMetadata?.id
            ? role === ADMIN_ROLE ||
              (role === PILOT_ROLE && findSpecificJaunt(allJaunts, addOrEditJauntMetadata?.id)?.status === DRAFT_STATUS)
            : true
        }
      />
      <Jaunts
        allJaunts={allJaunts}
        onJauntToBeDeletedChange={onJauntToBeDeletedChange}
        onJauntToBeEditedChange={onJauntToBeEditedChange}
        editJauntStatus={editJauntStatus}
        showSteps={showSteps}
        onShowStepsChange={onShowStepsChange}
        isDeletable={isJauntDeletable}
        isEditable={role === ADMIN_ROLE}
      />
    </>
  );
};

export default Index;
