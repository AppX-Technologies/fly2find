import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ConfirmPasswordForm from '../forms/ConfirmPasswordForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../services/userService';
import { toast } from 'react-toastify';

export default function ChangePassword() {
  const navigate = useNavigate();
  const { key } = useParams();
  const [tergetedUser, setTargetedUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [resetingPassword, setResetingPassword] = useState(false);

  const findUser = async () => {
    try {
      setTargetedUser(true);
      const { response, error } = await userService.getUserByResetPassword(key);

      if (response) {
        setUser(response);
      }
      if (error) {
        setErrorMessage({
          type: 'user',
          message: error
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTargetedUser(false);
    }
  };

  useEffect(() => {
    if (key) {
      findUser();
    }
  }, [key]);

  const createPassword = async ({ password }) => {
    try {
      setResetingPassword(true);
      const { response, error } = await userService.resetPassword({
        email: user?.email,
        resetPasswordKey: user?.resetPasswordKey,
        password
      });
      if (response) {
        toast.success('Password updated successfully. You can login using your new password');
        navigate('/auth/login');
      }
      if (error) {
        setErrorMessage({
          type: 'createPassword',
          message: error
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setResetingPassword(false);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center p-0">
      <Row className="w-100 justify-content-center m-0">
        <Col xs={12} sm={8} md={6} lg={4} className="px-4">
          <div className="p-4 shadow bg-white rounded-1">
            <p className="text-center ">
              Welocome <strong>{user?.name}</strong>, please change your password
            </p>
            <ConfirmPasswordForm
              loading={resetingPassword}
              errorMessage={errorMessage?.type === 'createPassword' ? errorMessage?.message : null}
              onSubmit={createPassword}
            />

            <Link className="w-100 text-decoration-none d-flex justify-content-center" to={'/auth/login'}>
              Already Have an Account
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
