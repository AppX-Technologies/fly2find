import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import ScrollToTop from './components/ScrollToTop';
import JauntRoute from './components/jaunt/JauntRoute';
import LandingPage from './components/landing/Landing';
import Registration from './components/registration/Registration';
import { ADMIN_ROLE, PILOT_ROLE } from './helpers/constants';
import Auth from './pages/Auth';
import AuthenticatedApp from './pages/AuthenticatedApp';
import { saveUserToLocal } from './helpers/session';

const sampleUserObj = {
  email: 'gautamrajat185@gmail.com',
  role: ADMIN_ROLE
};

const App = () => {
  // TODO

  saveUserToLocal(sampleUserObj);

  return (
    <Router>
      <ScrollToTop />
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/join">
          <Registration />
        </Route>
        <Route path="/login">
          <Auth />
        </Route>

        <Route path="/jaunt">
          <JauntRoute />
        </Route>

        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/">
          <AuthenticatedApp />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
};

export default App;
