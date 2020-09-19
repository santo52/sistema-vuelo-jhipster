import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Vuelo from './vuelo';
import VueloDetail from './vuelo-detail';
import VueloUpdate from './vuelo-update';
import VueloDeleteDialog from './vuelo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VueloUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VueloUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VueloDetail} />
      <ErrorBoundaryRoute path={match.url} component={Vuelo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VueloDeleteDialog} />
  </>
);

export default Routes;
