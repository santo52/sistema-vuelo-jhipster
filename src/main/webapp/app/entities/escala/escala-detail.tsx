import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './escala.reducer';
import { IEscala } from 'app/shared/model/escala.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEscalaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EscalaDetail = (props: IEscalaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { escalaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Escala [<b>{escalaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id_escala">Id Escala</span>
          </dt>
          <dd>{escalaEntity.id_escala}</dd>
          <dt>
            <span id="origen">Origen</span>
          </dt>
          <dd>{escalaEntity.origen}</dd>
          <dt>
            <span id="destino">Destino</span>
          </dt>
          <dd>{escalaEntity.destino}</dd>
          <dt>
            <span id="suben_pasajeros">Suben Pasajeros</span>
          </dt>
          <dd>{escalaEntity.suben_pasajeros}</dd>
        </dl>
        <Button tag={Link} to="/escala" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/escala/${escalaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ escala }: IRootState) => ({
  escalaEntity: escala.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EscalaDetail);
