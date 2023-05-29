import { cloneDeep } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons/dist';
import { toast } from 'react-toastify';
import { makeApiRequests } from '../../helpers/api';
import { ADMIN_ROLE, DRAFT_STATUS, PILOT_ROLE } from '../../helpers/constants';
import { ADD_JAUNT_FIELDS, EDIT_JAUNT_FIELD } from '../../helpers/forms';
import { convertBase64ToImage, createFilterObj, findSpecificJaunt, generateRandomUUID } from '../../helpers/global';
import AlertModal from '../AlertModal';
import FloatingButton from '../FloatingButton';
import HorizontalProgress from '../HorizontalProgress';
import SlidingSideBar from '../SlidingSideBar/SlidingSideBar';
import { UserContext } from '../context/userContext';
import AddOrEditJaunt from './AddOrEditJaunt';
import Filter from './Filter';
import Jaunts from './Jaunts';
import SecondaryHeader from './SecondaryHeader';

const generateRandomUUIDForAllJauntSteps = jaunts => {
  return jaunts
    ? [
        ...jaunts.map(jaunt => ({
          ...jaunt,
          steps: [...jaunt?.steps.map(step => ({ id: generateRandomUUID(), text: step }))],
          album: jaunt?.gallery
        }))
      ]
    : [];
};

const Index = () => {
  const { user } = useContext(UserContext);
  const [addOrEditJauntMetadata, setAddOrEditJauntMetadata] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [allJaunts, setAllJaunts] = useState([]);
  const [jauntToBeDeleted, setJauntToBeDeleted] = useState(null);
  const [jauntAddOrUpdateInProgress, setJauntAddOrUpdateInProgress] = useState(false);
  const [jauntDeleteInProgress, setJauntDeleteInProgress] = useState(false);
  const [statusUpdateInProcess, setStatusUpdateInProgress] = useState({});
  const [numberOfFiles, setNumberOfFiles] = useState({
    toBeUploaded: 0,
    alreadyUploaded: 0
  });

  const [globalizedJaunts, setGlobalizedJaunts] = useState(null); // stores allJaunts values and is unchangable
  const [globalFilterValues, setGlobalFilterValues] = useState({
    showing: 'All',
    sortBy: 'createdDate',
    isAssessending: true
  });

  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const [globalSearchInProgress, setGlobalSearchInProgress] = useState(false);
  const [jauntThumbnailLoading, setJauntThumbnailLoading] = useState({});

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

  const onGlobalSearchQueryChange = query => {
    setGlobalSearchQuery(query);
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

  const onAddJauntClick = async () => {
    const emptyField = ADD_JAUNT_FIELDS.find(jaunt => !addOrEditJauntMetadata[(jaunt?.key)]);

    if (emptyField) {
      return toast.error(`${emptyField?.label} Field Cannot Be Empty`);
    }
    setJauntAddOrUpdateInProgress(true);
    const { error, response } = await makeApiRequests({
      requestType: 'create-jaunt',
      requestBody: {
        ...addOrEditJauntMetadata,
        status: 'Draft',
        gallery: addOrEditJauntMetadata?.album
          ? addOrEditJauntMetadata?.album?.map(i => ({
              mimeType: i.mimeType,
              fileName: i?.fileName,
              fileId: i?.fileId
            }))
          : [],
        thumbnail: {
          fileId: addOrEditJauntMetadata?.thumbnail?.fileId,
          mimeType: addOrEditJauntMetadata?.thumbnail?.mimeType,
          fileName: addOrEditJauntMetadata?.thumbnail?.fileName
        },
        steps: addOrEditJauntMetadata?.steps?.map(step => step?.text)
      }
    });

    if (error) {
      setJauntAddOrUpdateInProgress(false);
      return toast.error(error);
    }

    setAllJaunts([...allJaunts, { ...response?.jaunt, thumbnail: addOrEditJauntMetadata?.thumbnail }]);
    onAddOrEditJauntModalClose();
    setJauntAddOrUpdateInProgress(false);
    toast.success('Jaunt Successfully Created');
  };

  // Triggers When Edit Button Is Clicked Inside The SlidingSidebar

  const onEditJauntClick = async () => {
    const emptyField = ADD_JAUNT_FIELDS.find(jaunt => !addOrEditJauntMetadata[(jaunt?.key)]);

    if (emptyField) {
      return toast.error(`${emptyField?.label} Field Cannot Be Empty`);
    }
    setJauntAddOrUpdateInProgress(true);

    delete addOrEditJauntMetadata?.createdBy;

    const { error, response } = await makeApiRequests({
      requestType: 'update-jaunt',
      requestBody: {
        ...addOrEditJauntMetadata,
        gallery: addOrEditJauntMetadata?.album
          ? addOrEditJauntMetadata?.album.map(i => ({
              mimeType: i.mimeType,
              fileName: i?.fileName,
              fileId: i?.fileId
            }))
          : [],
        thumbnail: {
          fileId: addOrEditJauntMetadata?.thumbnail?.fileId,
          mimeType: addOrEditJauntMetadata?.thumbnail?.mimeType,
          fileName: addOrEditJauntMetadata?.thumbnail?.fileName
        },
        steps: addOrEditJauntMetadata?.steps?.map(step => step?.text)
      }
    });

    if (error) {
      setJauntAddOrUpdateInProgress(false);
      return toast.error(error);
    }

    const toEditJauntIndex = allJaunts.findIndex(jaunt => jaunt?.id === addOrEditJauntMetadata?.id); // replace addOrEditJauntMetadata with response?.jaunt?.id
    allJaunts[toEditJauntIndex] = addOrEditJauntMetadata; // replace addOrEditJauntMetadata with response?.jaunt?.id
    setAllJaunts([...allJaunts]);
    onAddOrEditJauntModalClose();
    setJauntAddOrUpdateInProgress(false);
    toast.success('Jaunt Successfully Edited');
  };

  // Triggers When Delete Button Is Clicked In The Card

  const onDeleteJauntClick = async () => {
    setJauntDeleteInProgress(true);
    const { error, response } = await makeApiRequests({
      requestType: 'delete-jaunt',
      requestBody: { id: jauntToBeDeleted?.id }
    });

    if (error) {
      setJauntDeleteInProgress(false);

      return toast.error(error);
    }

    const toDeleteJauntIndex = allJaunts.findIndex(jaunt => jaunt?.id === jauntToBeDeleted?.id);
    allJaunts.splice(toDeleteJauntIndex, 1);
    setAllJaunts([...allJaunts]);
    setJauntToBeDeleted(null);
    setJauntDeleteInProgress(false);
    toast.success('Jaunt Successfully Deleted');
  };

  // Edit Status of A Jaunt From Card

  const editJauntStatus = async (jauntId, status) => {
    setStatusUpdateInProgress(prevStatusValues => ({ ...prevStatusValues, [jauntId]: true }));

    const { error, response } = await makeApiRequests({
      requestType: 'update-jaunt',
      requestBody: { id: jauntId, status }
    });

    if (error) {
      toast.error(error);
    } else {
      const toEditJauntIndex = allJaunts.findIndex(jaunt => jaunt?.id === jauntId);
      allJaunts[toEditJauntIndex] = { ...allJaunts[toEditJauntIndex], status };
      setAllJaunts([...allJaunts]);
      toast.success('Status Updates Successfully');
    }

    setStatusUpdateInProgress(prevStatusValues => {
      const updatedStatusValues = { ...prevStatusValues };
      delete updatedStatusValues[jauntId];
      return updatedStatusValues;
    });
  };

  const isJauntDeletable = jauntId => {
    if (
      user?.role === ADMIN_ROLE ||
      (user?.role === PILOT_ROLE && findSpecificJaunt(allJaunts, jauntId)?.status === DRAFT_STATUS)
    ) {
      return true;
    }
    return false;
  };

  const executeGlobalSearch = async () => {
    setGlobalSearchInProgress(true);
    let { error, response } = await makeApiRequests({
      requestType: 'search-jaunts',
      requestBody: {
        keyword: globalSearchQuery,
        sortSchema: {},
        filterSchema: createFilterObj(globalFilterValues?.filters)
      }
    });
    if (error) {
      setGlobalSearchInProgress(false);
      return toast.error(error);
    }

    response.jaunts = generateRandomUUIDForAllJauntSteps(response?.jaunts);

    setAllJaunts([...response.jaunts]);

    if (response?.jaunts?.length) {
      response.jaunts.forEach(async jaunt => {
        if (!jaunt?.thumbnail?.src) {
          const jauntIndex = response?.jaunts.findIndex(j => j?.id === jaunt?.id);

          // If allJaunts alreay contains the jaunts form search request there is no need to refetch the image again

          const jauntAlreadyExists = (globalizedJaunts || allJaunts)?.find(
            j => j?.thumbnail?.fileId === jaunt?.thumbnail?.fileId
          );

          if (!jauntAlreadyExists) {
            // For Thumbnail

            let thumbnailData = await onFetchingFiles({
              fileId: jaunt?.thumbnail?.fileId
            });

            if (thumbnailData) {
              response.jaunts[jauntIndex].thumbnail.src = convertBase64ToImage(thumbnailData);
            }

            // For Album

            if (jaunt?.album?.length) {
              jaunt.album.forEach(async albumFile => {
                let albumData = await onFetchingFiles({
                  fileId: albumFile?.fileId
                });

                const indexOfAlbum = response.jaunts[jauntIndex].album.findIndex(f => f?.fileId === albumFile?.fileId);
                if (indexOfAlbum !== -1) {
                  response.jaunts[jauntIndex].album[indexOfAlbum].src = convertBase64ToImage(albumData);
                }
              });
            }
          } else {
            // setting Thumbnail
            response.jaunts[jauntIndex].thumbnail = jauntAlreadyExists?.thumbnail;

            // setting Album
            response.jaunts[jauntIndex].album = jauntAlreadyExists?.album;
          }
          setAllJaunts([...response?.jaunts]);
        }
      });
    }

    if (!globalizedJaunts?.length) {
      setGlobalizedJaunts([...response?.jaunts]);
    }
    setGlobalSearchInProgress(false);
  };

  // Get Images

  const getFileChunk = async (fileId, chunkIndex) => {
    const fileInfoObject = {
      fileId,
      chunkIndex
    };

    const { error, response } = await makeApiRequests({
      requestType: 'read-file',
      requestBody: fileInfoObject
    });

    return await response;
  };

  const onFetchingFiles = async file => {
    let completeChunkData = '';
    let chunkIndex = 0;
    let totalChunks = 1;

    while (chunkIndex < totalChunks) {
      const response = await getFileChunk(file?.fileId, chunkIndex);
      if (response) {
        completeChunkData += response?.chunkData;
      }
      totalChunks = response?.totalChunks;
      chunkIndex += 1;
    }

    return completeChunkData;
  };

  useEffect(() => {
    if (!addOrEditJauntMetadata) {
      onNumberOfFilesChange(0);
    }
  }, [addOrEditJauntMetadata]);

  useEffect(() => {
    if (globalFilterValues?.showing && globalFilterValues?.sortBy) {
      executeGlobalSearch();
    }
  }, [globalFilterValues?.showing, globalFilterValues?.sortBy, globalFilterValues?.isAssessending]);

  // Syncing the allJaunts state and addOrEditJauntMeta State

  useEffect(() => {
    if (addOrEditJauntMetadata) {
      const jauntInfo = allJaunts.find(jaunt => jaunt?.id === addOrEditJauntMetadata?.id);
      setAddOrEditJauntMetadata({ ...jauntInfo });
    }
  }, [allJaunts]);

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

      {/* Filter Sidebar */}

      <SlidingSideBar visible={showFilter} onClose={() => onFilterValueChange(false)} title="Filter">
        <Filter
          onGlobalFilterValueChange={onGlobalFilterValueChange}
          globalFilterValues={globalFilterValues}
          executeGlobalSearch={executeGlobalSearch}
          onHide={() => onFilterValueChange(false)}
        />
      </SlidingSideBar>

      <FloatingButton
        text="Add Jaunt"
        icon={<PlusCircleFill size={15} className="mr-1" />}
        onClick={() => setAddOrEditJauntMetadata({ steps: [], album: [] })}
        variant="dark"
        backgroundClass="bg-gradient"
      />
      <SecondaryHeader
        onFilterValueChange={onFilterValueChange}
        onGlobalFilterValueChange={onGlobalFilterValueChange}
        globalFilterValues={globalFilterValues}
        executeGlobalSearch={executeGlobalSearch}
        inProgress={globalSearchInProgress}
        onGlobalSearchQueryChange={onGlobalSearchQueryChange}
        globalSearchQuery={globalSearchQuery}
      />
      {globalSearchInProgress && <HorizontalProgress text="Searching..." style={{ width: '92%', margin: '0 auto' }} />}
      {!globalSearchInProgress && !allJaunts?.length && (
        <h5 className="my-4 xxlarge text-center">No Jaunts To Show.</h5>
      )}

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
        jauntThumbnailLoading={jauntThumbnailLoading}
        numberOfFiles={numberOfFiles}
        isEditable={
          addOrEditJauntMetadata?.id
            ? user?.role === ADMIN_ROLE ||
              (user?.role === PILOT_ROLE &&
                findSpecificJaunt(allJaunts, addOrEditJauntMetadata?.id)?.status === DRAFT_STATUS)
            : true
        }
      />
      <Jaunts
        allJaunts={allJaunts}
        onJauntToBeDeletedChange={onJauntToBeDeletedChange}
        onJauntToBeEditedChange={onJauntToBeEditedChange}
        editJauntStatus={editJauntStatus}
        isDeletable={isJauntDeletable}
        isEditable={user?.role === ADMIN_ROLE}
        statusUpdateInProcess={statusUpdateInProcess}
        jauntThumbnailLoading={jauntThumbnailLoading}
      />
    </>
  );
};

export default Index;
