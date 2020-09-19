import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Avion from './avion';
import AvionDetail from './avion-detail';
import AvionUpdate from './avion-update';
import AvionDeleteDialog from './avion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AvionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AvionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AvionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Avion} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AvionDeleteDialog} />
  </>
);

export default Routes;
