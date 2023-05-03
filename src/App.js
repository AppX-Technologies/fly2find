import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';
import Registration from './components/registration/Registration';
import LandingPage from './components/landing/Landing';
import JauntRoute from './components/jaunt/JauntRoute';
import Auth from './pages/Auth';
import AuthenticatedApp from './pages/AuthenticatedApp';

const App = () => {
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
        <Route path="/admin">
          <AuthenticatedApp />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
};

export default App;
