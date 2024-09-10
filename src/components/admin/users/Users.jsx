import { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { ABORT_ERROR, makeRESTApiRequests } from '../../../helpers/api';
import { DEFAULT_PAGE_SIZE, ENDPOINTS } from '../../../helpers/constants';
import { getUserTableColumns } from '../../../helpers/dataSheetConstants';
import { updateItemsInArray } from '../../../helpers/global';
import { userService } from '../../../services/userService';
import AlertModal from '../../common/AlertModal';
import DataTable from '../../common/data-table/DataTable';
import FloatingButton from '../../common/FloatingButton';
import AddEditUserModal from './AddEditUserModal';
import PilotProfileModal from './PilotProfileModal';

const initialPageInfo = {
  pageNumber: 1,
  totalPages: 1
};

const Users = () => {
  const abortControllerRef = useRef(null);

  const [fetchingFirstPageUsers, setFetchingFirstPageUsers] = useState(false);
  const [fetchingMoreUsers, setFetchingMoreUsers] = useState(false);

  //original users array
  const [users, setUsers] = useState([]);

  const [toLoadPageInfo, setToLoadPageInfo] = useState(initialPageInfo);
  const [loadedPageInfo, setLoadedPageInfo] = useState();

  const [userAddEditModalMeta, setUserAddEditModalMeta] = useState(null);
  const [userDeleteModalMeta, setUserDeleteModalMeta] = useState(null);
  const [userProfileModalMeta, setUserProfileModalMeta] = useState(null);

  const onAddNewUserClick = () => {
    setUserAddEditModalMeta({});
  };

  const onEditUserClick = user => {
    setUserAddEditModalMeta({
      initialValues: {
        ...user
      },
      editMode: true,
      editingUser: user
    });
  };

  const onViewProfileClick = user => {
    setUserProfileModalMeta({
      user
    });
  };

  const onUserDeleteClick = async user => {
    setUserDeleteModalMeta({ user, showProgress: false });
  };

  const sendPasswordResetLink = async user => {
    if (!user?.email) return toast.error('This user donot have an email');
    let reqBody = { email: user?.email };
    toast.info('Sending password reset link...');
    try {
      const { response, error } = await userService.forgotPassword(reqBody);
      if (response) {
        toast.success('Password reset link has been sent');
      }
      if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tableColumns = useMemo(
    () => getUserTableColumns({ onUserDeleteClick, sendPasswordResetLink, onEditUserClick, onViewProfileClick }),
    [onUserDeleteClick, sendPasswordResetLink, onViewProfileClick]
  );

  const fetchUsers = async () => {
    if (!toLoadPageInfo) return;

    // If an old API call is in progress, abort it
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const pageToFetch = toLoadPageInfo?.pageNumber;
    const loadingMoreEvents = pageToFetch > 1;

    if (loadingMoreEvents) {
      setFetchingMoreUsers(true);
    } else {
      setFetchingFirstPageUsers(true);
    }

    const controller = new AbortController();
    const { signal } = controller;

    abortControllerRef.current = controller;

    const requestBody = {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: pageToFetch
    };

    const { response, error } = await userService.getUsers(requestBody, signal);

    if (error === ABORT_ERROR) return;

    setFetchingMoreUsers(false);
    setFetchingFirstPageUsers(false);

    if (error) {
      return toast.error(error);
    }

    const { pageNumber, totalPages, results = [] } = response;
    setLoadedPageInfo({ totalPages, pageNumber });
    setUsers(prevEvents => (loadingMoreEvents ? [...prevEvents, ...results] : results));
  };

  const loadMoreData = () => {
    if (!loadedPageInfo || fetchingFirstPageUsers || fetchingMoreUsers) return;

    if (loadedPageInfo.totalPages < loadedPageInfo.pageNumber) return;

    setToLoadPageInfo({
      ...loadedPageInfo,
      pageNumber: loadedPageInfo.pageNumber + 1
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [toLoadPageInfo]);

  const onUserChange = user => {
    setUsers(prevUsers => {
      const updatedUsers = updateItemsInArray(prevUsers, [user]);
      return updatedUsers;
    });
  };

  const onUserSubmit = async user => {
    const { editMode } = userAddEditModalMeta;
    setUserAddEditModalMeta(meta => ({ ...meta, showProgress: true }));
    let updatedUser = {
      _id: user._id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      roles: user?.roles,
      isEnabled: user?.isEnabled
    };
    const { response, error } = editMode
      ? await userService.updateUser(updatedUser)
      : await userService.createUser(user);
    setUserAddEditModalMeta(meta => ({ ...meta, showProgress: false }));

    if (error) {
      return toast.error(error);
    }

    setUserAddEditModalMeta(null);
    onUserChange(response);
    toast.success(editMode ? 'Successfully updated user' : 'Successfully added user');
  };

  const deleteUser = async () => {
    const { user } = userDeleteModalMeta;
    try {
      setUserDeleteModalMeta(meta => ({ ...meta, showProgress: true }));
      const { error } = await userService.deleteUser({
        email: user?.email
      });
      setUserDeleteModalMeta(meta => ({ ...meta, showProgress: false }));
      if (error) {
        return toast.error(error);
      }

      setUsers(users => users.filter(p => p._id !== user._id));
      toast.success('Successfully deleted user');
    } catch (error) {
      console.log(error);
    } finally {
      setUserDeleteModalMeta(null);
    }
  };

  const updatePilotProfile = async formData => {
    const requestBody = {
      _id: userProfileModalMeta.user._id,
      pilotProfile: formData
    };
    setUserProfileModalMeta({
      ...userProfileModalMeta,
      showProgress: true
    });

    const { response, error } = await userService.updateUser(requestBody);

    if (error) {
      toast.error(`Failed to update user: ${error}`);
      setUserProfileModalMeta({
        ...userProfileModalMeta,
        showProgress: false
      });
      return;
    }
    if (response) {
      const updatedUser = updateItemsInArray(users, response);
      setUsers(updatedUser);
      toast.success('Pilot Profile Updated Successfuly');
      setUserProfileModalMeta(null);
    }
  };

  console.log('user', userProfileModalMeta?.user?._id);

  return (
    <>
      <Container fluid className={'px-2 py-3'}>
        <div className="border rounded p-2 bg-white py-3">
          <h6 className="mb-3 xlarge fw-bold">Users ({users.length}):</h6>

          <DataTable
            maxTableHeight={`calc(100vh - 195px)`}
            rowKey={'_id'}
            columns={tableColumns}
            data={users}
            onBottomReached={loadMoreData}
            loadingMoreData={fetchingMoreUsers}
            loadingFirstPageData={fetchingFirstPageUsers}
            allowFilter={false}
            allowSort={false}
            striped
          />
        </div>
      </Container>
      <FloatingButton
        className="text-white"
        Icon={PlusCircleFill}
        variant="success"
        text={'Add New User'}
        onClick={onAddNewUserClick}
      />
      <AddEditUserModal
        show={Boolean(userAddEditModalMeta)}
        initialValues={userAddEditModalMeta?.initialValues}
        editMode={userAddEditModalMeta?.editMode}
        onHide={() => setUserAddEditModalMeta(null)}
        showProgress={userAddEditModalMeta?.showProgress}
        onSubmit={onUserSubmit}
      />
      <AlertModal
        show={Boolean(userDeleteModalMeta)}
        onHide={() => setUserDeleteModalMeta(null)}
        alertText={'Are you sure you want to delete this user?'}
        onContinueClick={deleteUser}
        onDismissClick={() => setUserDeleteModalMeta(null)}
        showProgress={userDeleteModalMeta?.showProgress}
      />
      <PilotProfileModal
        show={Boolean(userProfileModalMeta)}
        onHide={() => setUserProfileModalMeta(null)}
        initialValue={userProfileModalMeta?.user?.pilotProfile}
        onSubmit={updatePilotProfile}
        isEditing={false}
        userDetails={userProfileModalMeta?.user}
        showProgress={userProfileModalMeta?.showProgress}
      />
    </>
  );
};

export default Users;
