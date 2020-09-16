import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Aeropuerto from './aeropuerto';
import AeropuertoDetail from './aeropuerto-detail';
import AeropuertoUpdate from './aeropuerto-update';
import AeropuertoDeleteDialog from './aeropuerto-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AeropuertoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AeropuertoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AeropuertoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Aeropuerto} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AeropuertoDeleteDialog} />
  </>
);

export default Routes;
