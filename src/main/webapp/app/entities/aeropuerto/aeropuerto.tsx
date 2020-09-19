import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './aeropuerto.reducer';
import { IAeropuerto } from 'app/shared/model/aeropuerto.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAeropuertoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Aeropuerto = (props: IAeropuertoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { aeropuertoList, match, loading } = props;
  return (
    <div>
      <h2 id="aeropuerto-heading">
        Aeropuertos
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Aeropuerto
        </Link>
      </h2>
      <div className="table-responsive">
        {aeropuertoList && aeropuertoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Pais</th>
                <th>Programavuelo</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {aeropuertoList.map((aeropuerto, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${aeropuerto.id}`} color="link" size="sm">
                      {aeropuerto.id}
                    </Button>
                  </td>
                  <td>{aeropuerto.codigo}</td>
                  <td>{aeropuerto.nombre}</td>
                  <td>{aeropuerto.ciudad}</td>
                  <td>{aeropuerto.pais}</td>
                  <td>
                    {aeropuerto.programavuelo ? (
                      <Link to={`programavuelo/${aeropuerto.programavuelo.id}`}>{aeropuerto.programavuelo.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${aeropuerto.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${aeropuerto.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${aeropuerto.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Aeropuertos found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ aeropuerto }: IRootState) => ({
  aeropuertoList: aeropuerto.entities,
  loading: aeropuerto.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Aeropuerto);
