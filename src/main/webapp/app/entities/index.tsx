import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Aeropuerto from './aeropuerto';
import Vuelo from './vuelo';
import Avion from './avion';
import Programavuelo from './programavuelo';
import  Pasajeros from './pasajeros';
const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}aeropuerto`} component={Aeropuerto} />
      <ErrorBoundaryRoute path={`${match.url}vuelo`} component={Vuelo} />
      <ErrorBoundaryRoute path={`${match.url}avion`} component={Avion} />
      <ErrorBoundaryRoute path={`${match.url}pasajeros`} component={Pasajeros} />
      <ErrorBoundaryRoute path={`${match.url}programavuelo`} component={Programavuelo} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
