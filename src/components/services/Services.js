import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch, withRouter } from 'react-router-dom';
import { isStaff } from '../../helpers/global';
import WithAppChoices from '../../hooks/WithAppChoices';
import NotFound from '../NotFound';
import CreateService from './CreateService';
import EditService from './EditService';
import SearchService from './SearchService';
import ServiceDetails from './ServiceDetails';

export const subServicesRoutes = [
  {
    type: 'lienSearch',
    name: 'Lien Searches'
  },
  {
    type: 'estoppel',
    name: 'Estoppels'
  },
  {
    type: 'survey',
    name: 'Surveys'
  }
];

export const allSubRoute = {
  type: 'all',
  name: 'All'
};

const Services = () => {
  const [role] = useState(localStorage.getItem('user-role'));

  const getActivePage = () => {
    return (
      <Switch>
        <Route exact path="/services/create">
          <WithAppChoices render={appChoices => <CreateService appChoices={appChoices} />} />
        </Route>
        <Route exact path="/services/search">
          <WithAppChoices render={appChoices => <SearchService appChoices={appChoices} />} />
        </Route>

        <Route exact path="/services/:id">
          <WithAppChoices render={appChoices => <ServiceDetails appChoices={appChoices} />} />
        </Route>

        {isStaff(role) && (
          <Route exact path="/services/:id/edit">
            <WithAppChoices render={appChoices => <EditService appChoices={appChoices} />} />
          </Route>
        )}

        {subServicesRoutes.map((r, index) => (
          <Route key={`s-${index}`} exact path={`/services/search/${r.type}`}>
            <WithAppChoices render={appChoices => <SearchService appChoices={appChoices} type={r.type} />} />
          </Route>
        ))}

        {[allSubRoute, ...subServicesRoutes].map((r, index) => (
          <Route key={`c-${index}`} exact path={`/services/search/cancelled/${r.type}`}>
            <WithAppChoices render={appChoices => <SearchService appChoices={appChoices} type={r.type} cancelled />} />
          </Route>
        ))}

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    );
  };
  return (
    <Container fluid className="px-2 py-3 px-lg-5 h-100">
      {getActivePage()}
    </Container>
  );
};

export default withRouter(Services);
