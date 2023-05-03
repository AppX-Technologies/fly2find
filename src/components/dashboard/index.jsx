import React, { useState } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons/dist';
import { JAUNTS } from '../../helpers/constants';
import AlertModal from '../AlertModal';
import FloatingButton from '../FloatingButton';
import SlidingSideBar from '../SlidingSideBar/SlidingSideBar';
import AddOrEditJaunt from './AddOrEditJaunt';
import Jaunts from './Jaunts';
import SecondaryHeader from './SecondaryHeader';

const Index = () => {
  const [addOrEditJauntMetadata, setAddOrEditJauntMetadata] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [allJaunts, setAllJaunts] = useState(JAUNTS);
  const [jauntToBeDeleted, setJauntToBeDeleted] = useState(null);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    query: '',
    showing: 'All',
    sortBy: '',
    isAssessending: true
  });

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

  const onAddOrEditJauntFieldValueChange = (key, value) => {
    addOrEditJauntMetadata[key] = value;
    setAddOrEditJauntMetadata({ ...addOrEditJauntMetadata });
  };

  const onJauntToBeEditedChange = value => {
    setAddOrEditJauntMetadata({ ...value });
  };
  const onFilterValueChange = value => {
    setShowFilter(value);
  };

  const onAddJauntClick = () => {};

  const onEditJauntClick = () => {};

  const onDeleteJauntClick = () => {};

  return (
    <>
      <AlertModal
        show={jauntToBeDeleted}
        alertText={'Are You Sure You Want To Delete This Jaunt?'}
        onContinueClick={() => {}}
        onDismissClick={() => onJauntToBeDeletedChange(null)}
        showProgress={false}
        title="Delete This Jaunt"
        progressText="Deletibg..."
      />

      {/* Sidebar For Filter */}
      <SlidingSideBar visible={showFilter} onClose={() => onFilterValueChange(false)} title="Filter"></SlidingSideBar>

      <FloatingButton
        text="Add Jaunt"
        icon={<PlusCircleFill size={15} className="mr-1" />}
        onClick={() => setAddOrEditJauntMetadata({})}
        variant="dark"
      />
      <SecondaryHeader
        onFilterValueChange={onFilterValueChange}
        onGlobalFilterValueChange={onGlobalFilterValueChange}
        globalFilterValues={globalFilterValues}
      />
      <AddOrEditJaunt
        modalMetaData={addOrEditJauntMetadata}
        inProgress={false}
        onHide={onAddOrEditJauntModalClose}
        onAddOrEditJauntFieldValueChange={onAddOrEditJauntFieldValueChange}
      />
      <Jaunts
        allJaunts={allJaunts}
        onJauntToBeDeletedChange={onJauntToBeDeletedChange}
        onJauntToBeEditedChange={onJauntToBeEditedChange}
      />
    </>
  );
};

export default Index;
