import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Alert, Button, FormControl, FormGroup, FormLabel, ProgressBar } from 'react-bootstrap';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please provide your email address')
});

const ForgotPasswordForm = ({ showProgress, errorMessage, onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ submitForm }) => (
        <Form noValidate className="p-2">
          <FormGroup className="mb-2">
            <FormLabel className="mid mb-1">
              Email <span className="text-danger">*</span>{' '}
            </FormLabel>
            <Field name={'email'} type={'email'} as={FormControl} size="sm" />
            <ErrorMessage name={'email'} component="div" className="text-danger mid" />
          </FormGroup>

          {showProgress && <ProgressBar striped animated variant="dark" now={100} label={'Please wait....'} />}
          {errorMessage && (
            <Alert className="p-2 mt-3 mid" variant="danger">
              {errorMessage}
            </Alert>
          )}

          <Button className="mt-2" variant="primary" onClick={submitForm} size="sm" disabled={showProgress}>
            Reset Email
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
