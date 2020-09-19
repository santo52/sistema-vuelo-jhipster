import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './aeropuerto.reducer';
import { IAeropuerto } from 'app/shared/model/aeropuerto.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAeropuertoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AeropuertoDetail = (props: IAeropuertoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { aeropuertoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Aeropuerto [<b>{aeropuertoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="codigo">Codigo</span>
          </dt>
          <dd>{aeropuertoEntity.codigo}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{aeropuertoEntity.nombre}</dd>
          <dt>
            <span id="ciudad">Ciudad</span>
          </dt>
          <dd>{aeropuertoEntity.ciudad}</dd>
          <dt>
            <span id="pais">Pais</span>
          </dt>
          <dd>{aeropuertoEntity.pais}</dd>
          <dt>Programavuelo</dt>
          <dd>{aeropuertoEntity.programavuelo ? aeropuertoEntity.programavuelo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/aeropuerto" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/aeropuerto/${aeropuertoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ aeropuerto }: IRootState) => ({
  aeropuertoEntity: aeropuerto.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AeropuertoDetail);
