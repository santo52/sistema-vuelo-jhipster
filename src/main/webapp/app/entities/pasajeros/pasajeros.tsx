import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pasajeros.reducer';
import { IPasajeros } from 'app/shared/model/pasajeros.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPasajerosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Pasajeros = (props: IPasajerosProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { pasajerosList, match, loading } = props;
  return (
    <div>
      <h2 id="pasajeros-heading">
        Pasajeros
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Pasajeros
        </Link>
      </h2>
      <div className="table-responsive">
        {pasajerosList && pasajerosList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Vuelo</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pasajerosList.map((pasajeros, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pasajeros.id}`} color="link" size="sm">
                      {pasajeros.id}
                    </Button>
                  </td>
                  <td>{pasajeros.nombre}</td>
                  <td>{pasajeros.apellidos}</td>
                  <td>{pasajeros.vuelo ? <Link to={`vuelo/${pasajeros.vuelo.id}`}>{pasajeros.vuelo.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pasajeros.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pasajeros.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pasajeros.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Pasajeros found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ pasajeros }: IRootState) => ({
  pasajerosList: pasajeros.entities,
  loading: pasajeros.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pasajeros);
