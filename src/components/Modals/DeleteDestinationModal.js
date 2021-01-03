import React from 'react';
import propTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteDestinationModal = ({ deleteDestinationModalVisibility, handleDeleteDestinationModalVisibility, deleteDestination }) => (
    <Modal size='xs' aria-labelledby='contained-modal-title-vcenter' centered show={deleteDestinationModalVisibility} onHide={handleDeleteDestinationModalVisibility}>
        <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this destination ?</Modal.Body>

        <Modal.Footer>
            <Button variant='secondary' onClick={handleDeleteDestinationModalVisibility}>
                <FontAwesomeIcon color='#fff' icon={faTimes} /> Cancel
            </Button>

            <Button variant='danger' onClick={deleteDestination}>
                <FontAwesomeIcon color='#fff' icon={faTrash} /> Delete
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
