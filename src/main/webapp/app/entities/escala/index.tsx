import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Escala from './escala';
import EscalaDetail from './escala-detail';
import EscalaUpdate from './escala-update';
import EscalaDeleteDialog from './escala-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EscalaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EscalaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EscalaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Escala} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EscalaDeleteDialog} />
  </>
);

export default Routes;
