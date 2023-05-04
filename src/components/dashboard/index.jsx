import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons/dist';
import { toast } from 'react-toastify';
import { JAUNTS } from '../../helpers/constants';
import { ADD_JAUNT_FIELDS, EDIT_JAUNT_FIELD } from '../../helpers/forms';
import AlertModal from '../AlertModal';
import FloatingButton from '../FloatingButton';
import SlidingSideBar from '../SlidingSideBar/SlidingSideBar';
import AddOrEditJaunt from './AddOrEditJaunt';
import Filter from './Filter';
import Jaunts from './Jaunts';
import SecondaryHeader from './SecondaryHeader';

const Index = () => {
  const [addOrEditJauntMetadata, setAddOrEditJauntMetadata] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [allJaunts, setAllJaunts] = useState(JAUNTS);
  const [jauntToBeDeleted, setJauntToBeDeleted] = useState(null);
  const [showSteps, setShowSteps] = useState([]);
  const [numberOfFilesToBeUploaded, setNumberOfFilesToBeUploaded] = useState(0);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    query: '',
    showing: 'All',
    sortBy: '',
    isAssessending: true
  });

  const onNumberOfFilesToBeUploadedChange = value => setNumberOfFilesToBeUploaded(value);

  const onThumbnailChange = file => {
    onAddOrEditJauntFieldValueChange('thumbnail', file);
  };

  const onAlbumChange = file => {
    addOrEditJauntMetadata.album.push(file);
    setAddOrEditJauntMetadata(prevData => ({ ...prevData }));
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
      id: addOrEditJauntMetadata?.steps.length + 1
    }); // Use UUID Instead
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

    setAllJaunts([...allJaunts, { ...addOrEditJauntMetadata, id: allJaunts?.length + 1 }]); // Use UUID instead
    onAddOrEditJauntModalClose();
    toast.success('Jaunt Successfully Created');
  };

  // Triggers When Edit Button Is Clicked Inside The SlidingSidebar

  const onEditJauntClick = () => {
    const emptyField = ADD_JAUNT_FIELDS.find(jaunt => !addOrEditJauntMetadata[(jaunt?.key)]);

    if (emptyField) {
      return toast.error(`${emptyField?.label} Field Cannot Be Empty`);
    }
    const toEditJauntIndex = allJaunts.findIndex(jaunt => jaunt?.id === addOrEditJauntMetadata?.id);
    allJaunts[toEditJauntIndex] = addOrEditJauntMetadata;
    setAllJaunts([...allJaunts]);
    onAddOrEditJauntModalClose();
    toast.success('Jaunt Successfully Edited');
  };

  // Triggers When Delete Button Is Clicked In The Card

  const onDeleteJauntClick = () => {
    const toDeleteJauntIndex = allJaunts.findIndex(jaunt => jaunt?.id === jauntToBeDeleted?.id);
    allJaunts.splice(toDeleteJauntIndex, 1);
    setAllJaunts([...allJaunts]);
    setJauntToBeDeleted(null);
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

  useEffect(() => {
    setShowSteps([...allJaunts.map(({ id }) => id)]);
  }, [allJaunts]);

  // if (!loggedInEmail) {
  //   return <Redirect from="/admin/jaunts" to={'/login'} />;
  // }

  return (
    <>
      <AlertModal
        show={jauntToBeDeleted}
        alertText={'Are You Sure You Want To Delete This Jaunt?'}
        onContinueClick={() => onDeleteJauntClick()}
        onDismissClick={() => onJauntToBeDeletedChange(null)}
        showProgress={false}
        title="Delete This Jaunt"
        progressText="Deletibg..."
      />

      {/* Sidebar For Filter */}
      <SlidingSideBar visible={showFilter} onClose={() => onFilterValueChange(false)} title="Filter">
        <Filter />
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
      />
      <AddOrEditJaunt
        modalMetaData={addOrEditJauntMetadata}
        fields={addOrEditJauntMetadata?.id ? EDIT_JAUNT_FIELD : ADD_JAUNT_FIELDS}
        inProgress={false}
        onHide={onAddOrEditJauntModalClose}
        onAddOrEditJauntFieldValueChange={onAddOrEditJauntFieldValueChange}
        onAddJauntClick={onAddJauntClick}
        onEditJauntClick={onEditJauntClick}
        handleStepToBeCompletedAddition={handleStepToBeCompletedAddition}
        handleStepToBeCompletedDeletion={handleStepToBeCompletedDeletion}
        onThumbnailChange={onThumbnailChange}
        onAlbumChange={onAlbumChange}
        onNumberOfFilesToBeUploadedChange={onNumberOfFilesToBeUploadedChange}
        numberOfFilesToBeUploaded={numberOfFilesToBeUploaded}
      />
      <Jaunts
        allJaunts={allJaunts}
        onJauntToBeDeletedChange={onJauntToBeDeletedChange}
        onJauntToBeEditedChange={onJauntToBeEditedChange}
        editJauntStatus={editJauntStatus}
        showSteps={showSteps}
        onShowStepsChange={onShowStepsChange}
      />
    </>
  );
};

export default Index;
