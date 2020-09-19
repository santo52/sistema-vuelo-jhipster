import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pasajeros from './pasajeros';
import PasajerosDetail from './pasajeros-detail';
import PasajerosUpdate from './pasajeros-update';
import PasajerosDeleteDialog from './pasajeros-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PasajerosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PasajerosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PasajerosDetail} />
      <ErrorBoundaryRoute path={match.url} component={Pasajeros} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PasajerosDeleteDialog} />
  </>
);

export default Routes;
