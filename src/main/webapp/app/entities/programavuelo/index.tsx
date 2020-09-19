import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Programavuelo from './programavuelo';
import ProgramavueloDetail from './programavuelo-detail';
import ProgramavueloUpdate from './programavuelo-update';
import ProgramavueloDeleteDialog from './programavuelo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProgramavueloUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProgramavueloUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProgramavueloDetail} />
      <ErrorBoundaryRoute path={match.url} component={Programavuelo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProgramavueloDeleteDialog} />
  </>
);

export default Routes;
