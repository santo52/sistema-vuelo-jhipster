import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row>
      <Col md="9">
        <h2>Bienvenido al sistema de vuelos!</h2>
        <p className="lead">Desarrollado por</p>
        <p className="lead">KAREN JULIETH GOMEZ MORENO</p>
        <p className="lead">NATALIA CRUZ LOZANO</p>
        <p className="lead">SANTIAGO RUIZ ESPITIA</p>

        {account && account.login ? (
          <div>
            <Alert color="success">Estas logueado con el usuario {account.login}.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              If you want to
              <Link to="/login" className="alert-link">
                {' '}
                Ingresar
              </Link>
              , Cuentas por defecto:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
              <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
            </Alert>
          </div>
        )}

      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
