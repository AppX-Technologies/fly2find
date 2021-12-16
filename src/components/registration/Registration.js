import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Jaunt from './Jaunt';
import Pilot from './Pilot';
import NotFound from '../NotFound';
import NavBar from '../NavBar';

const Registration = () => {
  const getActivePage = () => {
    return (
      <Switch>
        <Route exact path="/join/pilot">
          <Pilot />
        </Route>
        <Route exact path="/join/jaunt">
          <Jaunt />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    );
  };
  return (
    <div className="bg-gradient-light">
      <NavBar />
      <Container fluid className="px-2 px-lg-5">
        {getActivePage()}
      </Container>
    </div>
  );
};

export default withRouter(Registration);
