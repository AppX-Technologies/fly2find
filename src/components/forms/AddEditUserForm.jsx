import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Card, Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { ADMIN_ROLE, ALL_ROLES } from '../../helpers/constants';
import useAuth from '../../hooks/useAuth';
import HorizontalProgress from '../HorizontalProgress';
import CustomMultiSelect from '../common/CustomMultiSelect';

// Yup validation schema updated with new requirements
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please provide the user name'),
  email: Yup.string()
    .email('Email is not valid')
    .required('Please provide the user email'),
  roles: Yup.array(),
  phone: Yup.string()
});

const defaultValues = {
  name: '',
  email: '',
  roles: [ADMIN_ROLE],
  phone: '',
  isEnabled: undefined
};

const AddEditUserForm = ({ initialValues, showProgress, editMode, onSubmit }) => {
  const { user } = useAuth();
  return (
    <Formik
      initialValues={initialValues ?? defaultValues} // setting default role to Admin
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onSubmit(values);
      }}
    >
      {({ setFieldValue, values, submitForm }) => {
        return (
          <Form className="p-2">
            <Row>
              <Col xs={12} md={6}>
                <FormGroup className="mb-2">
                  <FormLabel className="mid mb-1">Name</FormLabel>
                  <Field name="name" type="text" className="form-control form-control-sm" size="sm" />
                  <ErrorMessage name="name" component="div" className="text-danger mid" />
                </FormGroup>
              </Col>
              {editMode && (
                <Col xs={12} md={6}>
                  <FormGroup className="mb-2">
                    <FormLabel className="mid mb-1">Status</FormLabel>
                    <Field
                      as="select"
                      name="inEnabled"
                      value={values?.isEnabled ? 'Enable' : 'Disable'}
                      onChange={e => setFieldValue('isEnabled', e.target.value === 'Enable')}
                      className="form-control form-control-sm"
                    >
                      {['Enable', 'Disable'].map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Field>
                  </FormGroup>
                </Col>
              )}
              <Col xs={12} md={6}>
                <FormGroup className="mb-2">
                  <FormLabel className="mid mb-1">Email</FormLabel>
                  <Field name="email" type="text" className="form-control form-control-sm" size="sm" />
                  <ErrorMessage name="email" component="div" className="text-danger mid" />
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
                <FormGroup className="mb-2">
                  <FormLabel className="mid mb-1">Phone Number</FormLabel>
                  <Field name="phone" type="text" className="form-control form-control-sm" size="sm" />
                  <ErrorMessage name="phone" component="div" className="text-danger mid" />
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
                <FormGroup className="mb-2">
                  <FormLabel className="mid mb-1">Role</FormLabel>
                  <CustomMultiSelect
                    items={ALL_ROLES.map(r => ({ label: r, value: r }))}
                    selectedItems={values.roles}
                    onChange={role => {
                      setFieldValue('roles', role);
                    }}
                  />

                  <ErrorMessage name="roles" component="div" className="text-danger mid" />
                </FormGroup>
              </Col>
            </Row>

            {showProgress && <HorizontalProgress text={`Please wait...`} />}
            <div className="text-end">
              <Button
                className="mt-2"
                variant="success text-white"
                onClick={submitForm}
                size="sm"
                disabled={showProgress}
              >
                {!editMode ? 'Save' : 'Update'}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEditUserForm;
