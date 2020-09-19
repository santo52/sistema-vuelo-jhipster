import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './avion.reducer';
import { IAvion } from 'app/shared/model/avion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAvionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Avion = (props: IAvionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { avionList, match, loading } = props;
  return (
    <div>
      <h2 id="avion-heading">
        Avions
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Avion
        </Link>
      </h2>
      <div className="table-responsive">
        {avionList && avionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Avion</th>
                <th>Marca</th>
                <th>Capacidad</th>
                <th>Modelo</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {avionList.map((avion, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${avion.id}`} color="link" size="sm">
                      {avion.id}
                    </Button>
                  </td>
                  <td>{avion.id_avion}</td>
                  <td>{avion.marca}</td>
                  <td>{avion.capacidad}</td>
                  <td>{avion.modelo}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${avion.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${avion.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${avion.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Avions found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ avion }: IRootState) => ({
  avionList: avion.entities,
  loading: avion.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Avion);
