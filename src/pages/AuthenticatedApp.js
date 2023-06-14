import React from 'react';
import { Redirect, Route, Switch, useLocation, withRouter } from 'react-router';
import NotFound from '../components/NotFound';
import Dashboard from '../components/dashboard';
import PrimaryHeader from '../components/dashboard/PrimaryHeader';
import Profile from '../components/profile/Profile';
import useAuth from '../hooks/useAuth';

const AuthenticatedApp = () => {
  const { user, onUserChange } = useAuth();

  const { pathname } = useLocation();

  if (!user) {
    return <Redirect from={pathname} to={'/login'} />;
  }

  return (
    <>
      <PrimaryHeader />
      <Switch>
        <Route path="/admin/jaunts" exact>
          <Dashboard />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default withRouter(AuthenticatedApp);
