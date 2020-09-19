import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vuelo.reducer';
import { IVuelo } from 'app/shared/model/vuelo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVueloProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Vuelo = (props: IVueloProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vueloList, match, loading } = props;
  return (
    <div>
      <h2 id="vuelo-heading">
        Vuelos
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Vuelo
        </Link>
      </h2>
      <div className="table-responsive">
        {vueloList && vueloList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Idvuelo</th>
                <th>Fecha</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vueloList.map((vuelo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vuelo.id}`} color="link" size="sm">
                      {vuelo.id}
                    </Button>
                  </td>
                  <td>{vuelo.idvuelo}</td>
                  <td>{vuelo.fecha ? <TextFormat type="date" value={vuelo.fecha} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vuelo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vuelo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vuelo.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Vuelos found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vuelo }: IRootState) => ({
  vueloList: vuelo.entities,
  loading: vuelo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Vuelo);
