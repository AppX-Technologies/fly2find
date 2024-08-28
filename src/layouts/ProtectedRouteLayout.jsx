import React from 'react';
import { Outlet } from 'react-router-dom';
import PrimaryHeader from '../components/dashboard/PrimaryHeader';

const ProtectedRouteLayout = ({ headerVisible = true }) => {
  return (
    <>
      {headerVisible && <PrimaryHeader />}
      <Outlet />
    </>
  );
};

export default ProtectedRouteLayout;
