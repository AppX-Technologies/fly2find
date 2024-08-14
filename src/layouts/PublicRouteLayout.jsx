import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';

const PublicRouteLayout = () => {
  return (
    <div className="bg-gradient-light" style={{ minHeight: '100vh' }}>
      <NavBar />
      <Container fluid className="px-2 px-lg-5">
        <Outlet />
      </Container>
    </div>
  );
};

export default PublicRouteLayout;
