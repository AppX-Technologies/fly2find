import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { loginFormRows } from '../../helpers/forms';
import useAuth from '../../hooks/useAuth';
import LoginForm from '../forms/LoginForm';

export default function Login() {
  const { login, isLoggingIn, loginError } = useAuth();

  const [showForgotPassModal, setShowForgotPassModal] = useState(null);

  const onSubmit = async ({ email, password }) => {
    login(email, password);
  };

  const onForgotPasswordSubmit = async data => {
    try {
      setShowForgotPassModal({ showProgress: true });
      const { response, error } = await userService.forgotPassword(data);
      if (response) {
        toast.success('Password reset link has been sent');
        setShowForgotPassModal(null);
      }
      if (error) {
        setShowForgotPassModal({ showProgress: false, errorMessage: error });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center p-0">
      <Row className="w-100 justify-content-center m-0">
        <Col xs={12} sm={8} md={6} lg={4} className="px-4">
          <div className="p-4 shadow bg-white rounded-1">
            <p className="text-center ">Welcome back! Log in to Fly</p>
            <LoginForm isLoggingIn={isLoggingIn} loginError={loginError} onSubmit={onSubmit} />

            <Button variant="link" className="w-100 text-decoration-none">
              Forgot Password
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
