import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './programavuelo.reducer';
import { IProgramavuelo } from 'app/shared/model/programavuelo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProgramavueloDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProgramavueloDetail = (props: IProgramavueloDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { programavueloEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Programavuelo [<b>{programavueloEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="escala">Escala</span>
          </dt>
          <dd>{programavueloEntity.escala}</dd>
          <dt>
            <span id="idprograma">Idprograma</span>
          </dt>
          <dd>{programavueloEntity.idprograma}</dd>
          <dt>
            <span id="linea">Linea</span>
          </dt>
          <dd>{programavueloEntity.linea}</dd>
          <dt>
            <span id="dias">Dias</span>
          </dt>
          <dd>
            {programavueloEntity.dias ? <TextFormat value={programavueloEntity.dias} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>Vuelo</dt>
          <dd>{programavueloEntity.vuelo ? programavueloEntity.vuelo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/programavuelo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/programavuelo/${programavueloEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ programavuelo }: IRootState) => ({
  programavueloEntity: programavuelo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProgramavueloDetail);
