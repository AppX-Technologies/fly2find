import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Alert, Button, FormControl, FormGroup, FormLabel, ProgressBar } from 'react-bootstrap';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Password is required')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    })
});

const ConfirmPasswordForm = ({ loading, errorMessage, onSubmit }) => {
  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ submitForm }) => (
        <Form noValidate className="p-2">
          {[
            {
              name: 'password',
              type: 'password',
              label: 'Password'
            },
            {
              name: 'confirmPassword',
              type: 'password',
              label: 'Confirm Password'
            }
          ].map(field => (
            <FormGroup key={field.name} className="mb-2">
              <FormLabel className="mid mb-1">{field.label}</FormLabel>
              <Field name={field.name} type={field.type} as={FormControl} size="sm" />
              <ErrorMessage name={field.name} component="div" className="text-danger mid" />
            </FormGroup>
          ))}

          {loading && <ProgressBar striped animated variant="dark" now={100} label={'please wait....'} />}
          {errorMessage && (
            <Alert className="p-2 mt-3 mid" variant="danger">
              {errorMessage}
            </Alert>
          )}

          <Button className="mt-2 w-100" variant="primary" onClick={submitForm} size="sm" disabled={loading}>
            {'submit'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ConfirmPasswordForm;
