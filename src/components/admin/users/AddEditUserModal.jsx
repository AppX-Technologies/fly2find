import AppModal from '../../common/AppModal';
import AddEditUserForm from '../../forms/AddEditUserForm';

const AddEditUserModal = ({ show, initialValues, editMode, onHide, showProgress, onSubmit }) => {
  const onFormSubmit = user => {
    const userToSubmit = {
      ...user
    };

    onSubmit && onSubmit(userToSubmit);
  };

  return (
    <AppModal
      size={'lg'}
      show={show}
      onHide={onHide}
      title={editMode ? 'Update user' : 'Add new user'}
      showCloseButton={!showProgress}
    >
      <AddEditUserForm
        initialValues={initialValues}
        showProgress={showProgress}
        editMode={editMode}
        onSubmit={onFormSubmit}
      />
    </AppModal>
  );
};

export default AddEditUserModal;
