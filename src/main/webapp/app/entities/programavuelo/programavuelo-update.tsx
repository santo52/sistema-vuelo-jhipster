import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVuelo } from 'app/shared/model/vuelo.model';
import { getEntities as getVuelos } from 'app/entities/vuelo/vuelo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './programavuelo.reducer';
import { IProgramavuelo } from 'app/shared/model/programavuelo.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProgramavueloUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProgramavueloUpdate = (props: IProgramavueloUpdateProps) => {
  const [vueloId, setVueloId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { programavueloEntity, vuelos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/programavuelo');
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
        ...programavueloEntity,
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
          <h2 id="sistemavuelosApp.programavuelo.home.createOrEditLabel">Create or edit a Programavuelo</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : programavueloEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="programavuelo-id">ID</Label>
                  <AvInput id="programavuelo-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="escalaLabel" for="programavuelo-escala">
                  Escala
                </Label>
                <AvField
                  id="programavuelo-escala"
                  type="text"
                  name="escala"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="idprogramaLabel" for="programavuelo-idprograma">
                  Idprograma
                </Label>
                <AvField
                  id="programavuelo-idprograma"
                  type="string"
                  className="form-control"
                  name="idprograma"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lineaLabel" for="programavuelo-linea">
                  Linea
                </Label>
                <AvField
                  id="programavuelo-linea"
                  type="text"
                  name="linea"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="diasLabel" for="programavuelo-dias">
                  Dias
                </Label>
                <AvField
                  id="programavuelo-dias"
                  type="date"
                  className="form-control"
                  name="dias"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="programavuelo-vuelo">Vuelo</Label>
                <AvInput id="programavuelo-vuelo" type="select" className="form-control" name="vuelo.id">
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
              <Button tag={Link} id="cancel-save" to="/programavuelo" replace color="info">
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
  programavueloEntity: storeState.programavuelo.entity,
  loading: storeState.programavuelo.loading,
  updating: storeState.programavuelo.updating,
  updateSuccess: storeState.programavuelo.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProgramavueloUpdate);
