import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { LOGIN_MODE, REGISTER_MODE } from '../../helpers/constants';

const LoginOrRegister = ({
  formInfo,
  onFormInfoChange,
  formSubmitting,
  fields,
  mode,
  styles,
  onModeChange,
  onForgotPassModalChange,
  onFormSubmit,
  onEmailVerification,
  isEmailVerified
}) => {
  return (
    <>
      {fields.map(({ key, label, type }) => {
        return (
          <Form.Group className="mb-3" id={`${mode}-form-${key}`} key={key}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
              type={type}
              placeholder={`${label}`}
              value={formInfo?.[key] || ''}
              onChange={e => onFormInfoChange(key, e.target.value)}
              autocomplete="off"
            />
          </Form.Group>
        );
      })}

      <div className="w-100 d-flex justify-content-center">
        <Button
          variant="primary"
          onClick={mode === LOGIN_MODE ? onFormSubmit : isEmailVerified ? LOGIN_MODE : onEmailVerification}
          disabled={formSubmitting}
        >
          {mode === LOGIN_MODE ? 'Login' : isEmailVerified ? 'Register' : 'Verify Email'}
        </Button>
      </div>

      {mode === LOGIN_MODE && (
        <>
          <p
            style={styles.loginSignupText}
            className={`text-right mx-2 ${formSubmitting ? 'text-muted' : ''}`}
            onClick={() => {
              if (formSubmitting) return;
              onForgotPassModalChange({});
            }}
          >
            Forgot password?
          </p>
          <hr />
          <p
            style={styles.loginSignupText}
            className={`text-center mx-2 ${formSubmitting ? 'text-muted' : ''}`}
            onClick={() => {
              if (formSubmitting) return;
              onModeChange(REGISTER_MODE);
            }}
          >
            Don't have an account? Click here to register
          </p>
        </>
      )}

      {mode === REGISTER_MODE && (
        <>
          <hr />
          <p
            style={styles.loginSignupText}
            className={`text-center mb-0 ${formSubmitting ? 'text-muted' : ''}`}
            onClick={() => {
              if (formSubmitting) return;
              onModeChange(LOGIN_MODE);
            }}
          >
            Already have an account? Click here to login.
          </p>
        </>
      )}
    </>
  );
};

export default LoginOrRegister;
