import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVuelo } from 'app/shared/model/vuelo.model';
import { getEntities as getVuelos } from 'app/entities/vuelo/vuelo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pasajeros.reducer';
import { IPasajeros } from 'app/shared/model/pasajeros.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPasajerosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PasajerosUpdate = (props: IPasajerosUpdateProps) => {
  const [vueloId, setVueloId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pasajerosEntity, vuelos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pasajeros');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVuelos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pasajerosEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sistemavuelosApp.pasajeros.home.createOrEditLabel">Create or edit a Pasajeros</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pasajerosEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pasajeros-id">ID</Label>
                  <AvInput id="pasajeros-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="pasajeros-vuelo">Vuelo</Label>
                <AvInput id="pasajeros-vuelo" type="select" className="form-control" name="vuelo.id">
                  <option value="" key="0" />
                  {vuelos
                    ? vuelos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pasajeros" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  vuelos: storeState.vuelo.entities,
  pasajerosEntity: storeState.pasajeros.entity,
  loading: storeState.pasajeros.loading,
  updating: storeState.pasajeros.updating,
  updateSuccess: storeState.pasajeros.updateSuccess,
});

const mapDispatchToProps = {
  getVuelos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PasajerosUpdate);
