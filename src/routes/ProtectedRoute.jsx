import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ roles }) => {
  const { isUserLoggedIn, user } = useAuth();
  const { pathname, search } = useLocation();

  if (!isUserLoggedIn || (roles && roles.includes(user?.role))) {
    const redirectTo = pathname + search;
    return <Navigate to={`/auth/login?redirect=${redirectTo}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
