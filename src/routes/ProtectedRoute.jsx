import React from 'react';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ roles }) => {
  return <Outlet />;
};

export default ProtectedRoute;
