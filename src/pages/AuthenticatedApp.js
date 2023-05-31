import React from 'react';
import { Redirect, Route, Switch, useLocation, withRouter } from 'react-router';
import NotFound from '../components/NotFound';
import Dashboard from '../components/dashboard';
import PrimaryHeader from '../components/dashboard/PrimaryHeader';
import Profile from '../components/profile/Profile';
import { useContext } from 'react';
import { UserContext } from '../components/context/userContext';

const AuthenticatedApp = () => {
  const { user, onUserChange } = useContext(UserContext);

  const { pathname } = useLocation();

  if (!user?.token) {
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
