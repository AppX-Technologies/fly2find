import React, { useState } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons/dist';
import { JAUNTS } from '../../helpers/constants';
import FloatingButton from '../FloatingButton';
import SlidingSideBar from '../SlidingSideBar/SlidingSideBar';
import AddJaunt from './AddJaunt';
import Jaunts from './Jaunts';
import SecondaryHeader from './SecondaryHeader';

const Index = () => {
  const [addJauntMetaData, setAddJauntMetaData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [allJaunts, setAllJaunts] = useState(JAUNTS);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    query: '',
    showing: 'All',
    sortBy: '',
    isAssessending: true
  });
  console.log(globalFilterValues, 'globalFilterValues');

  const onGlobalFilterValueChange = (key, value) => {
    globalFilterValues[key] = value;
    setGlobalFilterValues({ ...globalFilterValues });
  };

  const onAddJauntModalClose = () => {
    setAddJauntMetaData(null);
  };

  const onFilterValueChange = value => {
    setShowFilter(value);
  };

  const onAddJauntFieldValueChange = (key, value) => {
    addJauntMetaData[key] = value;
    setAddJauntMetaData({ ...addJauntMetaData });
  };

  return (
    <>
      {/* Sidebar For Filter */}
      <SlidingSideBar visible={showFilter} onClose={() => onFilterValueChange(false)} title="Filter"></SlidingSideBar>

      <FloatingButton
        text="Add Jaunt"
        icon={<PlusCircleFill size={15} className="mr-1" />}
        onClick={() => setAddJauntMetaData({})}
        variant="dark"
      />
      <SecondaryHeader
        onFilterValueChange={onFilterValueChange}
        onGlobalFilterValueChange={onGlobalFilterValueChange}
        globalFilterValues={globalFilterValues}
      />
      <AddJaunt
        modalMetaData={addJauntMetaData}
        inProgress={false}
        onHide={onAddJauntModalClose}
        onAddJauntFieldValueChange={onAddJauntFieldValueChange}
      />
      <Jaunts allJaunts={allJaunts} />
    </>
  );
};

export default Index;
