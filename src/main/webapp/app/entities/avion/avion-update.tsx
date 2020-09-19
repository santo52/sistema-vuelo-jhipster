import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAeropuerto } from 'app/shared/model/aeropuerto.model';
import { getEntities as getAeropuertos } from 'app/entities/aeropuerto/aeropuerto.reducer';
import { getEntity, updateEntity, createEntity, reset } from './avion.reducer';
import { IAvion } from 'app/shared/model/avion.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAvionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvionUpdate = (props: IAvionUpdateProps) => {
  const [idsaeropuerto, setIdsaeropuerto] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { avionEntity, aeropuertos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/avion');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAeropuertos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...avionEntity,
        ...values,
        aeropuertos: mapIdList(values.aeropuertos),
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
          <h2 id="sistemavuelosApp.avion.home.createOrEditLabel">Create or edit a Avion</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : avionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="avion-id">ID</Label>
                  <AvInput id="avion-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="id_avionLabel" for="avion-id_avion">
                  Id Avion
                </Label>
                <AvField
                  id="avion-id_avion"
                  type="string"
                  className="form-control"
                  name="id_avion"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="marcaLabel" for="avion-marca">
                  Marca
                </Label>
                <AvField
                  id="avion-marca"
                  type="text"
                  name="marca"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="capacidadLabel" for="avion-capacidad">
                  Capacidad
                </Label>
                <AvField
                  id="avion-capacidad"
                  type="text"
                  name="capacidad"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="modeloLabel" for="avion-modelo">
                  Modelo
                </Label>
                <AvField
                  id="avion-modelo"
                  type="text"
                  name="modelo"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="avion-aeropuerto">Aeropuerto</Label>
                <AvInput
                  id="avion-aeropuerto"
                  type="select"
                  multiple
                  className="form-control"
                  name="aeropuertos"
                  value={avionEntity.aeropuertos && avionEntity.aeropuertos.map(e => e.id)}
                >
                  <option value="" key="0">Seleccionar ...</option>
                  {aeropuertos
                    ? aeropuertos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/avion" replace color="info">
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
  aeropuertos: storeState.aeropuerto.entities,
  avionEntity: storeState.avion.entity,
  loading: storeState.avion.loading,
  updating: storeState.avion.updating,
  updateSuccess: storeState.avion.updateSuccess,
});

const mapDispatchToProps = {
  getAeropuertos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AvionUpdate);
