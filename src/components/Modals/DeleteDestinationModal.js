import React from 'react';
import propTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const DeleteDestinationModal = ({ deleteDestinationModalVisibility, handleDeleteDestinationModalVisibility, deleteDestination }) => (
    <Modal size='xs' aria-labelledby='contained-modal-title-vcenter' centered show={deleteDestinationModalVisibility} onHide={handleDeleteDestinationModalVisibility}>
        <Modal.Header closeButton>
            <Modal.Title>Suppression</Modal.Title>
        </Modal.Header>

        <Modal.Body>Êtes-vous sur de vouloir supprimer cette destination ?</Modal.Body>

        <Modal.Footer>
            <Button variant='secondary' onClick={handleDeleteDestinationModalVisibility}>
                Annuler
            </Button>

            <Button variant='danger' onClick={deleteDestination}>
                Supprimer
            </Button>
        </Modal.Footer>
    </Modal>
);

DeleteDestinationModal.propTypes = {
    deleteDestinationModalVisibility: propTypes.bool.isRequired,
    handleDeleteDestinationModalVisibility: propTypes.func.isRequired,
    deleteDestination: propTypes.func.isRequired,
};

export default DeleteDestinationModal;
