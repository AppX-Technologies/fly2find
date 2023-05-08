import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import NotFound from '../NotFound';
import NavBar from '../NavBar';
import RecentJaunts from './Recent';
import FinishJaunt from './FinishJaunt';

const JauntRoute = () => {
  const getActivePage = () => {
    return (
      <Switch>
        <Route exact path="/jaunt/recent">
          <RecentJaunts />
        </Route>
        <Route exact path="/jaunt/finish">
          <FinishJaunt />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    );
  };
  return (
    <div className="bg-gradient-light vh-100">
      <NavBar />
      <Container fluid className="px-2 px-lg-5">
        {getActivePage()}
      </Container>
    </div>
  );
};

export default withRouter(JauntRoute);
