import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Alert, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import * as Yup from 'yup';
import HorizontalProgress from '../HorizontalProgress';

// Yup validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please provide your email address'),
  password: Yup.string().required('Please provide your password')
});

const LoginForm = ({ isLoggingIn, loginError, onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ submitForm }) => (
        <Form noValidate className="p-2">
          {[
            {
              name: 'email',
              type: 'email',
              label: 'Email'
            },
            {
              name: 'password',
              type: 'password',
              label: 'Password'
            }
          ].map(field => (
            <FormGroup key={field.name} className="mb-2">
              <FormLabel className="mid mb-1">{field.label}</FormLabel>
              <Field name={field.name} type={field.type} as={FormControl} size="sm" />
              <ErrorMessage name={field.name} component="div" className="text-danger mid" />
            </FormGroup>
          ))}

          {isLoggingIn && <HorizontalProgress text={`logging in...`} />}
          {loginError && (
            <Alert className="p-2 mt-3 mid" variant="danger">
              {loginError}
            </Alert>
          )}

          <Button className="mt-2 w-100" variant="primary" onClick={submitForm} size="sm" disabled={isLoggingIn}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
