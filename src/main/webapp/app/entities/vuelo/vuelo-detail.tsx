import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vuelo.reducer';
import { IVuelo } from 'app/shared/model/vuelo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVueloDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VueloDetail = (props: IVueloDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vueloEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Vuelo [<b>{vueloEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idvuelo">Idvuelo</span>
          </dt>
          <dd>{vueloEntity.idvuelo}</dd>
          <dt>
            <span id="fecha">Fecha</span>
          </dt>
          <dd>{vueloEntity.fecha ? <TextFormat value={vueloEntity.fecha} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/vuelo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vuelo/${vueloEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vuelo }: IRootState) => ({
  vueloEntity: vuelo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VueloDetail);
