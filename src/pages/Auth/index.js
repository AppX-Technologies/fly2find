import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { PersonBadge } from 'react-bootstrap-icons/dist';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import { firebaseAuth } from '../../firebase';
import { highlightError, removeHighlightedError } from '../../form-generator/helpers/utility';
import { makeApiRequests } from '../../helpers/api';
import { LOGIN_MODE, REGISTER_MODE } from '../../helpers/constants';
import { LOGIN_FORM_FIELDS, REGISTER_FORM_FIELDS } from '../../helpers/forms';
import { getErrorMessageFromFirebase } from '../../helpers/global';
import ForgotPassword from './ForgotPassword';
import LoginOrRegister from './LoginOrRegister';

const Auth = () => {
  const [mode, setMode] = useState(LOGIN_MODE);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formInfo, setFormInfo] = useState({});
  const [forgotPassModalMetadata, setForgotPassModalMetadata] = useState(null);
  const [signInError, setSignInError] = useState('');
  const [sendingMail, setSendingMail] = useState(false);

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

  const loggedInEmail = localStorage.getItem('user-email');

  useEffect(() => {
    if (mode === REGISTER_MODE) {
      setFormInfo({});
    }
    setSignInError('');

    removeHighlightedError('validationMsg');
  }, [mode]);

  const auth = async (email, user, name, fromRegister) => {
    const idToken = await user.getIdToken();
    const gid = user.uid;

    setSignInError('');
    const { response: authResult, error } = await makeApiRequests({
      requestType: 'auth',
      requestBody: { idToken, name }
    });

    if (error) {
      if (fromRegister) {
        throw new Error();
      } else {
        setSignInError(error);
      }
      setFormSubmitting(false);
      return;
    }

    const role = authResult['role'];
    localStorage.setItem('user-email', email);
    localStorage.setItem('user-gid', gid);
    localStorage.setItem('user-name', authResult['name']);
    localStorage.setItem('user-role', role);
    localStorage.setItem('user-role-applied', authResult['appliedFor']);
    localStorage.setItem('user-application-id', authResult['applicationId']);
    localStorage.setItem('user-allowed-order-placement', authResult['allowOrderPlacement']);
    localStorage.setItem('user-clients', JSON.stringify(authResult['clientsAndSites']));
    history.push('/');
  };

  const onLoginFormSubmit = async () => {
    setSignInError('');
    const email = formInfo?.email;
    const password = formInfo?.password;

    const emptyField = LOGIN_FORM_FIELDS.find(field => !formInfo[(field?.key)]);

    if (emptyField) {
      return highlightError(
        document.getElementById(`${mode}-form-${emptyField?.key}`),
        `${emptyField?.label} Is Empty`
      );
    }
    setFormSubmitting(true);

    try {
      const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
      await auth(email, cred.user);

      setFormSubmitting(false);
    } catch (e) {
      setFormSubmitting(false);
      setSignInError(getErrorMessageFromFirebase(e));
    }
  };

  const onRegisterFormSubmit = async () => {
    setSignInError('');

    const name = formInfo?.name;
    const email = formInfo?.email;
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

    let userCreated = false;
    try {
      const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      userCreated = true;
      await auth(email, cred.user, name, true);
      setMode(LOGIN_MODE);
      setFormSubmitting(false);
    } catch (e) {
      setFormSubmitting(false);
      if (userCreated) {
        toast.error(
          'A user with the above email has been created, however there was some error logging in. Please try logging in to your account'
        );
      } else {
        setSignInError(getErrorMessageFromFirebase(e));
      }
    }
  };

  const onForgotPasswordFormSubmit = async () => {
    if (!forgotPassModalMetadata?.email) {
      return highlightError(document.getElementById(`fp-form-email`), `Email Is Empty`);
    }

    setSendingMail(true);
    sendPasswordResetEmail(firebaseAuth, forgotPassModalMetadata?.email)
      .then(() => {
        toast.success('Mail sent successfully!');
        setSendingMail(false);
        onForgotPassModalChange(null);
      })
      .catch(error => {
        toast.error(getErrorMessageFromFirebase(error));
        setSendingMail(false);
      });
  };

  if (loggedInEmail) {
    return <Redirect from="/login" to={'/admin/jaunts'} />;
  }

  return (
    <>
      <ForgotPassword
        forgotPassModalMetadata={forgotPassModalMetadata}
        onHide={() => onForgotPassModalChange(null)}
        onForgotPassFieldValueChange={onForgotPassFieldValueChange}
        onFormSubmit={onForgotPasswordFormSubmit}
        sendingMail={sendingMail}
      />
      <Container fluid className="h-100 bg-gradient-light">
        <Row className="h-100">
          <Col xs={12} className="p-4">
            <Row className="justify-content-center h-100">
              <Col xs={10} md={6} className="align-self-center">
                <div className="text-center mb-2">
                  <h1 className="logo mb-4 text-light">
                    F<span className="underline ">ly2Find</span>
                  </h1>
                  {/* <Image className="mx-auto" src={`${process.env.PUBLIC_URL}/logo.png`} height={85} /> */}
                </div>
                <Card className="">
                  <Card.Body>
                    <div className="d-flex justify-content-center">
                      <h5 className="text-dark my-1">
                        <PersonBadge className="mr-2 " />
                        {mode === LOGIN_MODE ? 'Login' : 'Register'}
                      </h5>
                    </div>
                    <hr />
                    <LoginOrRegister
                      formInfo={formInfo}
                      onFormInfoChange={onFormInfoChange}
                      formSubmitting={formSubmitting}
                      fields={mode === LOGIN_MODE ? LOGIN_FORM_FIELDS : REGISTER_FORM_FIELDS}
                      mode={mode}
                      styles={styles}
                      onModeChange={onModeChange}
                      onForgotPassModalChange={onForgotPassModalChange}
                      onFormSubmit={mode === LOGIN_MODE ? onLoginFormSubmit : onRegisterFormSubmit}
                    />

                    {formSubmitting && (
                      <ProgressBar
                        className="mt-1"
                        striped
                        animated
                        variant="dark"
                        now={100}
                        label={mode === LOGIN_MODE ? 'Logging in...' : 'Creating account...'}
                      />
                    )}
                    {signInError && (
                      <Alert style={{ fontSize: 14 }} className="mx-2 p-2" variant="danger">
                        {signInError}
                      </Alert>
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
