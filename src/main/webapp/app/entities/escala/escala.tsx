import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './escala.reducer';
import { IEscala } from 'app/shared/model/escala.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEscalaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Escala = (props: IEscalaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { escalaList, match, loading } = props;
  return (
    <div>
      <h2 id="escala-heading">
        Escalas
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Escala
        </Link>
      </h2>
      <div className="table-responsive">
        {escalaList && escalaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id Escala</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Suben Pasajeros</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {escalaList.map((escala, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${escala.id}`} color="link" size="sm">
                      {escala.id}
                    </Button>
                  </td>
                  <td>{escala.id_escala}</td>
                  <td>{escala.origen}</td>
                  <td>{escala.destino}</td>
                  <td>{escala.suben_pasajeros}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${escala.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${escala.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${escala.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Escalas found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ escala }: IRootState) => ({
  escalaList: escala.entities,
  loading: escala.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Escala);
