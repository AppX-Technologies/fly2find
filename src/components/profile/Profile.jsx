import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, FormControl, Row } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import FormGenerator from '../../form-generator/FormGenerator';
import { getFormattedDate, highlightError } from '../../form-generator/helpers/utility';
import { makeApiRequests } from '../../helpers/api';
import { changePasswordForm } from '../../helpers/forms';
import { getProfileFromLocalStorage, saveUserToLocal } from '../../helpers/session';
import Heading from '../Heading';
import HorizontalProgress from '../HorizontalProgress';
import Loader from '../Loader';
import OverViewColumns from '../OverViewColumns';

const ChangePasswordForm = ({ showProgress, error }) => {
  return (
    <>
      <FormGenerator formJson={changePasswordForm} />
      {showProgress && <HorizontalProgress text="Changing password..." />}
      {error && (
        <Alert style={{ fontSize: 14 }} className="mx-2 p-2" variant="danger">
          {error}
        </Alert>
      )}
    </>
  );
};

const commonFields = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone Number', key: 'phone' }
];

const commonEditFields = [{ label: 'Name', key: 'name' }, { label: 'Phone Number', key: 'phone' }];

const Profile = () => {
  const [role] = useState(localStorage.getItem('user-role'));
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editingProfile, setEditingProfile] = useState();
  const [editMode, setEditMode] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [savingProfile, setSubmittingProfile] = useState(false);

  const getProfile = async () => {
    setLoadingProfile(true);
    try {
      const { error, response } = await makeApiRequests({
        requestType: 'getMe'
      });

      setLoadingProfile(false);

      if (error) {
        toast.error(error);
        return;
      }

      setEditingProfile(response);
    } catch (e) {
      setLoadingProfile(false);
      toast.error('Something went wrong! Please try again');
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onChangePasswordFormSubmit = async form => {
    const oldPassword = form['Old Password'];
    const newPassword = form['New Password'];
    const confirmPassword = form['Confirm Password'];

    if (newPassword !== confirmPassword) {
      highlightError(document.getElementById('confirmPassword'), 'Passwords do not match');
      return;
    }

    setFormSubmitting(true);

    try {
      const { error, response } = await makeApiRequests({
        requestType: 'changePassword',
        requestBody: { oldPassword, newPassword, confirmPassword }
      });

      setFormSubmitting(false);
      if (error) {
        toast.error(error);
        return;
      }

      ['oldPassword', 'newPassword', 'confirmPassword'].forEach(id => {
        try {
          document.getElementById(id).value = '';
        } catch (error) {}
      });
      toast.success('Password updated successfully!');
    } catch (e) {
      setFormSubmitting(false);
      toast.error('Something went wrong! Please try again');
      console.log(e);
    }
  };

  window['onChangePasswordFormSubmit'] = onChangePasswordFormSubmit;

  const onCancelProfileEdit = () => {
    setEditingProfile(getProfileFromLocalStorage());
    setEditMode(false);
  };

  const onSaveProfileClick = async () => {
    const isSomeFieldEmpty = commonFields.some(f => !editingProfile[f.key]);

    if (isSomeFieldEmpty) {
      return toast.error('Please fill all the fields!');
    }

    const requestBody = {};
    commonFields.forEach(f => {
      requestBody[f.key] = editingProfile[f.key];
    });

    setSubmittingProfile(true);
    try {
      const { error, response } = await makeApiRequests({
        requestType: 'updateUser',
        requestBody
      });

      setSubmittingProfile(false);

      if (error) {
        toast.error(error);
        return;
      }

      saveUserToLocal(response);
      setEditingProfile(getProfileFromLocalStorage());
      setEditMode(false);
      toast.success('Profile updated successfully!');
    } catch (e) {
      setSubmittingProfile(false);
      toast.error('Something went wrong! Please try again');
      console.log(e);
    }
  };

  return (
    <Container className="px-0 px-md-5 py-3 bg-white" fluid>
      <Row>
        <Col xs={12} className="px-4 px-md-5">
          <Card className="fade-in ">
            <Card.Body className="left-bar rounded">
              <div className="d-flex">
                <div className="d-none d-md-block px-2 py-3 text-dark">
                  <PersonCircle size={50} />
                </div>
                <div className="d-md-none px-1 py-3 text-dark">
                  <PersonCircle size={35} />
                </div>
                <div className="flex-grow-1 bg-white px-4">
                  {loadingProfile ? (
                    <Loader />
                  ) : (
                    editingProfile && (
                      <>
                        <Heading
                          title={'Profile Details'}
                          withEditToggle
                          editMode={editMode}
                          onEditClick={() => setEditMode(true)}
                          onCancelClick={onCancelProfileEdit}
                          onSaveClick={onSaveProfileClick}
                          inProgress={savingProfile}
                        />
                        {!editMode ? (
                          <OverViewColumns
                            md={6}
                            className="m-1 mb-4"
                            fieldsToShow={commonFields}
                            data={editingProfile}
                          />
                        ) : (
                          <Row className="m-1 mb-4">
                            {commonEditFields.map(({ label, key, type = 'text' }) => {
                              return (
                                <Col xs={12} md={6} key={key} className="mt-2  px-2">
                                  <h6 className="mb-1 text-dark ">
                                    <span className="text-muted mid">{label}: </span>
                                  </h6>
                                  <FormControl
                                    size="sm"
                                    className="mb-0  text-dark px-2 py-1 large rounded"
                                    type={type}
                                    value={
                                      type === 'date'
                                        ? editingProfile[key]
                                          ? getFormattedDate(editingProfile[key])
                                          : ''
                                        : editingProfile[key]
                                    }
                                    onChange={e =>
                                      setEditingProfile({
                                        ...editingProfile,
                                        [key]: e.target.value
                                      })
                                    }
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        )}

                        <Heading title={'Password Change'} />
                        <ChangePasswordForm showProgress={formSubmitting} />
                      </>
                    )
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
