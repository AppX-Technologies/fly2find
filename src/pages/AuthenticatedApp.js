import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation, withRouter } from 'react-router';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import Services from '../components/services/Services';
import Tasks from '../components/tasks/Tasks';
import { makeApiRequests } from '../helpers/api';

const AuthenticatedApp = () => {
  const loggedInEmail = localStorage.getItem('user-email');
  const location = useLocation();

  const getAuth = async () => {
    const { response: authResult, error } = await makeApiRequests({ requestType: 'auth' });

    if (error) {
      return;
    }

    const role = authResult['role'];

    if (!authResult['newUser']) {
      localStorage.setItem('user-name', authResult['userName']);
      localStorage.setItem('user-role', role);
      if (role === 'Client') {
        localStorage.setItem('user-org-id', authResult['organizationId']);
        localStorage.setItem('user-phone', authResult['phoneNumber']);
        localStorage.setItem('user-org-name', authResult['organizationName']);
      }
    }
  };

  useEffect(() => {
    if (loggedInEmail) getAuth();
  }, []);

  if (loggedInEmail) {
    const newUser = localStorage.getItem('newUser');
    if (newUser) return <Redirect from="/login" to="/complete-registration" />;
  } else {
    return <Redirect from="/" to="/login" />;
  }

  if (location.pathname === '/') {
    return <Redirect from="/" to="/services/search" />;
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/services">
          <Services />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default withRouter(AuthenticatedApp);
