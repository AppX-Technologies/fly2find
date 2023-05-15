import React, { useEffect, useState } from 'react';
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { PersonBadge } from 'react-bootstrap-icons/dist';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import { highlightError, removeHighlightedError } from '../../form-generator/helpers/utility';
import { makeApiRequests } from '../../helpers/api';
import { ADMIN_ROLE, LOGIN_MODE, REGISTER_MODE } from '../../helpers/constants';
import {
  LOGIN_FORM_FIELDS,
  REGISTER_FORM_FIELDS,
  RESET_PASSWORD_FIELDS,
  VERIFY_EMAIL_FORM_FIELDS
} from '../../helpers/forms';
import ForgotPassword from './ForgotPassword';
import LoginOrRegister from './LoginOrRegister';
import ResetPassword from './ResetPassword';
import { useContext } from 'react';
import { UserContext } from '../../components/context/userContext';

const Auth = () => {
  const { onUserChange } = useContext(UserContext);

  const [mode, setMode] = useState(LOGIN_MODE); // Login or Register Mode
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formInfo, setFormInfo] = useState({}); // Register or Login Form Info
  const [forgotPassModalMetadata, setForgotPassModalMetadata] = useState(null); // Forgot Pass Modal formInfo
  const [sendingMail, setSendingMail] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false); // If email is not verified verify email form is shown else register form
  const [resetPasswordFormMetadata, setResetPasswordFormMetadata] = useState(null); // Reset Pass Modal formInfo
  const [resettingPassword, setResettingPaasword] = useState(false);

  const history = useHistory();

  const onFormInfoChange = (key, value) => {
    formInfo[key] = value;
    setFormInfo({ ...formInfo });
  };

  const onModeChange = value => {
    setMode(value);
  };

  const onForgotPassModalChange = value => {
    setForgotPassModalMetadata(value);
  };

  const onForgotPassFieldValueChange = (key, value) => {
    forgotPassModalMetadata[key] = value;
    setForgotPassModalMetadata({ ...forgotPassModalMetadata });
  };

  const onResetPasswordFormMetadataChange = (key, value) => {
    resetPasswordFormMetadata[key] = value;
    setResetPasswordFormMetadata({ ...resetPasswordFormMetadata });
  };

  const userToken = localStorage.getItem('user-token');

  useEffect(() => {
    if (mode === REGISTER_MODE) {
      setFormInfo({});
    }

    removeHighlightedError('validationMsg');
  }, [mode]);

  const auth = async () => {
    const { response: authResult, error } = await makeApiRequests({
      requestType: mode === LOGIN_MODE ? 'login' : 'register',
      requestBody: { ...formInfo, registrationOTP: formInfo?.temporaryKey }
    });

    if (error) {
      return toast.error(error);
    }

    if (mode === REGISTER_MODE) {
      setMode(LOGIN_MODE);
      return;
    }

    // Saving Overall User Object In Local Storage

    localStorage.setItem('user', JSON.stringify({ role: ADMIN_ROLE, token: authResult?.accessToken?.jwt }));

    localStorage.setItem('user-token', authResult?.accessToken?.jwt);
    localStorage.setItem('user-role', ADMIN_ROLE);

    onUserChange({ token: authResult?.accessToken?.jwt, role: ADMIN_ROLE });
    history.push('/');
  };

  const onEmailVerification = async () => {
    if (!isEmailVerified) {
      const emptyField = VERIFY_EMAIL_FORM_FIELDS.find(field => !formInfo[(field?.key)]);

      if (emptyField) {
        return highlightError(
          document.getElementById(`${mode}-form-${emptyField?.key}`),
          `${emptyField?.label} Is Empty`
        );
      }

      setFormSubmitting(true);
      const { response: authResult, error } = await makeApiRequests({
        requestType: 'get-registration-OTP',
        requestBody: { email: formInfo?.email }
      });

      if (error) {
        setFormSubmitting(false);
        return toast.error(error);
      }
      toast.success('OTP Is Successfully Sent To Your Email Address.');
      setIsEmailVerified(true);
      setFormSubmitting(false);
    }
  };

  const onLoginFormSubmit = async () => {
    const emptyField = LOGIN_FORM_FIELDS.find(field => !formInfo[(field?.key)]);

    if (emptyField) {
      return highlightError(
        document.getElementById(`${mode}-form-${emptyField?.key}`),
        `${emptyField?.label} Is Empty`
      );
    }
    setFormSubmitting(true);

    try {
      await auth();
      setFormSubmitting(false);
    } catch (e) {
      setFormSubmitting(false);
    }
  };

  const onRegisterFormSubmit = async () => {
    const password = formInfo?.password;
    const confirmPassword = formInfo?.confirmPassword;

    const emptyField = REGISTER_FORM_FIELDS.find(field => !formInfo[(field?.key)]);

    if (emptyField) {
      return highlightError(
        document.getElementById(`${mode}-form-${emptyField?.key}`),
        `${emptyField?.label} Is Empty`
      );
    }

    if (password !== confirmPassword) {
      return highlightError(document.getElementById(`${mode}-form-confirmPassword`), 'Password Didnot Match.');
    }

    setFormSubmitting(true);

    try {
      await auth();
      setMode(LOGIN_MODE);
      setFormSubmitting(false);
    } catch (e) {
      setFormSubmitting(false);
    }
  };

  const onForgotPasswordFormSubmit = async () => {
    if (!forgotPassModalMetadata?.email) {
      return highlightError(document.getElementById(`fp-form-email`), `Email Is Empty`);
    }

    setSendingMail(true);
    const { response: authResult, error } = await makeApiRequests({
      requestType: 'get-password-reset-link',
      requestBody: { email: forgotPassModalMetadata?.email }
    });

    if (error) {
      setSendingMail(false);
      return toast.error(error);
    }

    toast.success('Email Reset Link Sent Successfully.');
    setSendingMail(false);
    setResetPasswordFormMetadata({});
  };

  const onResetPasswordFormSubmit = async () => {
    const newPassword = resetPasswordFormMetadata?.newPassword;
    const confirmPassword = resetPasswordFormMetadata?.confirmPassword;

    const emptyField = RESET_PASSWORD_FIELDS.find(field => !resetPasswordFormMetadata[(field?.key)]);

    if (emptyField) {
      return highlightError(document.getElementById(`rp-form-${emptyField?.key}`), `${emptyField?.label} Is Empty`);
    }

    if (newPassword !== confirmPassword) {
      return highlightError(document.getElementById(`rp-form-confirmPassword`), 'Password Didnot Match.');
    }
    setResettingPaasword(true);
    const { response: authResult, error } = await makeApiRequests({
      requestType: 'reset-password',
      requestBody: { email: forgotPassModalMetadata?.email, ...resetPasswordFormMetadata }
    });

    if (error) {
      setResettingPaasword(false);
      return toast.error(error);
    }
    toast.success('Password Reset Is Successfully Complete.');

    setResetPasswordFormMetadata(null);
    setForgotPassModalMetadata(null);
    setResettingPaasword(false);
  };

  if (userToken) {
    return <Redirect from="/login" to={'/admin/jaunts'} />;
  }

  return (
    <>
      {resetPasswordFormMetadata ? (
        <ResetPassword
          resetPasswordFormMetadata={resetPasswordFormMetadata}
          onResetPasswordFormMetadataChange={onResetPasswordFormMetadataChange}
          onHide={() => setResetPasswordFormMetadata(null)}
          onFormSubmit={onResetPasswordFormSubmit}
          inProgress={resettingPassword}
        />
      ) : (
        <ForgotPassword
          forgotPassModalMetadata={forgotPassModalMetadata}
          onHide={() => onForgotPassModalChange(null)}
          onForgotPassFieldValueChange={onForgotPassFieldValueChange}
          onFormSubmit={onForgotPasswordFormSubmit}
          inProgress={sendingMail}
        />
      )}
      <Container
        fluid
        className="bg-gradient-light"
        style={{ height: mode === LOGIN_MODE || !isEmailVerified ? '100%' : '130vh' }} // Temporary Needs To Be Changed
      >
        <Row className="h-100">
          <Col xs={12} className="p-4">
            <Row className="justify-content-center h-100">
              <Col xs={10} md={6} className="align-self-center">
                <div className="text-center mb-2">
                  <h1 className="logo mb-4 text-light">
                    F<span className="underline ">ly2Find</span>
                  </h1>
                </div>
                <Card className="">
                  <Card.Body>
                    <div className="d-flex justify-content-center">
                      <h5 className="text-dark my-1">
                        <PersonBadge className="mr-2 " />
                        {mode === LOGIN_MODE ? 'Login' : isEmailVerified ? 'Register' : 'Verify Email'}
                      </h5>
                    </div>
                    <hr />
                    <LoginOrRegister
                      formInfo={formInfo}
                      onFormInfoChange={onFormInfoChange}
                      formSubmitting={formSubmitting}
                      fields={
                        mode === LOGIN_MODE
                          ? LOGIN_FORM_FIELDS
                          : isEmailVerified
                          ? REGISTER_FORM_FIELDS
                          : VERIFY_EMAIL_FORM_FIELDS
                      }
                      mode={mode}
                      styles={styles}
                      onModeChange={onModeChange}
                      onForgotPassModalChange={onForgotPassModalChange}
                      onFormSubmit={mode === LOGIN_MODE ? onLoginFormSubmit : onRegisterFormSubmit}
                      onEmailVerification={onEmailVerification}
                      isEmailVerified={isEmailVerified}
                    />

                    {formSubmitting && (
                      <ProgressBar
                        className="mt-1"
                        striped
                        animated
                        variant="dark"
                        now={100}
                        label={
                          mode === LOGIN_MODE
                            ? 'Logging in...'
                            : isEmailVerified
                            ? 'Creating account...'
                            : 'Sending OTP'
                        }
                      />
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const styles = {
  loginSignupText: {
    fontSize: 12,
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

export default Auth;
