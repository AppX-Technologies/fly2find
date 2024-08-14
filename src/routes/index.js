import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Login from '../components/auth/Login';
import Dashboard from '../components/dashboard';
import FinishJaunt from '../components/jaunt/FinishJaunt';
import RecentJaunts from '../components/jaunt/Recent';
import LandingPage from '../components/landing/Landing';
import Jaunt from '../components/registration/Jaunt';
import Pilot from '../components/registration/Pilot';
import ProtectedRouteLayout from '../layouts/ProtectedRouteLayout';
import PublicRouteLayout from '../layouts/PublicRouteLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route element={<PublicRouteLayout />}>
            <Route path="auth">
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="join">
              <Route path="pilot" element={<Pilot />} />
              <Route path="jaunt" element={<Jaunt />} />
            </Route>
            <Route path="jaunt">
              <Route path="recent" element={<RecentJaunts />} />
              <Route path="finish" element={<FinishJaunt />} />
            </Route>
          </Route>
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedRouteLayout />}>
            <Route path="admin">
              <Route path="jaunts" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
