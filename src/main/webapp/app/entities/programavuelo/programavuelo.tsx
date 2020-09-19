import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './programavuelo.reducer';
import { IProgramavuelo } from 'app/shared/model/programavuelo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProgramavueloProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Programavuelo = (props: IProgramavueloProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { programavueloList, match, loading } = props;
  return (
    <div>
      <h2 id="programavuelo-heading">
        Programavuelos
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Programavuelo
        </Link>
      </h2>
      <div className="table-responsive">
        {programavueloList && programavueloList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Escala</th>
                <th>Idprograma</th>
                <th>Linea</th>
                <th>Dias</th>
                <th>Vuelo</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {programavueloList.map((programavuelo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${programavuelo.id}`} color="link" size="sm">
                      {programavuelo.id}
                    </Button>
                  </td>
                  <td>{programavuelo.escala}</td>
                  <td>{programavuelo.idprograma}</td>
                  <td>{programavuelo.linea}</td>
                  <td>
                    {programavuelo.dias ? <TextFormat type="date" value={programavuelo.dias} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{programavuelo.vuelo ? <Link to={`vuelo/${programavuelo.vuelo.id}`}>{programavuelo.vuelo.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${programavuelo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${programavuelo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${programavuelo.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Programavuelos found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ programavuelo }: IRootState) => ({
  programavueloList: programavuelo.entities,
  loading: programavuelo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Programavuelo);
