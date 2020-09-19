import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProgramavuelo } from 'app/shared/model/programavuelo.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './programavuelo.reducer';

export interface IProgramavueloDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProgramavueloDeleteDialog = (props: IProgramavueloDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/programavuelo');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.programavueloEntity.id);
  };

  const { programavueloEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody id="sistemavuelosApp.programavuelo.delete.question">Are you sure you want to delete this Programavuelo?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-programavuelo" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ programavuelo }: IRootState) => ({
  programavueloEntity: programavuelo.entity,
  updateSuccess: programavuelo.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProgramavueloDeleteDialog);
