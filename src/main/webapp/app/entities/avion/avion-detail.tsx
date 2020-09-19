import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './avion.reducer';
import { IAvion } from 'app/shared/model/avion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAvionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvionDetail = (props: IAvionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { avionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Avion [<b>{avionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id_avion">Id Avion</span>
          </dt>
          <dd>{avionEntity.id_avion}</dd>
          <dt>
            <span id="marca">Marca</span>
          </dt>
          <dd>{avionEntity.marca}</dd>
          <dt>
            <span id="capacidad">Capacidad</span>
          </dt>
          <dd>{avionEntity.capacidad}</dd>
          <dt>
            <span id="modelo">Modelo</span>
          </dt>
          <dd>{avionEntity.modelo}</dd>
          <dt>Aeropuerto</dt>
          <dd>
            {avionEntity.aeropuertos
              ? avionEntity.aeropuertos.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {avionEntity.aeropuertos && i === avionEntity.aeropuertos.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/avion" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/avion/${avionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ avion }: IRootState) => ({
  avionEntity: avion.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AvionDetail);
