import React from 'react';
import propTypes from 'prop-types';

import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Checkbox } from 'pretty-checkbox-react';
import FocusedInput from '../FocusedInput';

import '../../assets/css/AddDestinationModal.css';

const AddDestinationModal = (props) => {
    const { isEnabled, handleEnabledCheckbox, handleModalVisibility, handleLocalStorageClear, modalVisibility, handleSubmit, addDestination, register } = props;

    return (
        <Modal autoFocus={false} size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={modalVisibility} onHide={handleModalVisibility}>
            <Modal.Body className='addModal'>
                <Form onSubmit={handleSubmit(addDestination)}>
                    <Form.Label className='modal-title'>Ajouter une destination</Form.Label>

                    <Form.Group>
                        <Form.Control required className='modal-city' size='lg' type='text' placeholder='Nom de la ville' id='city' name='city' ref={register} />

                        <FocusedInput register={register} />

                        <Row>
                            <Col>
                                <Form.Control required className='modal-stat' size='lg' type='number' min='0' max='20000000' placeholder='Habitants' id='population' name='population' ref={register} />
                            </Col>

                            <Col>
                                <Form.Control required className='modal-stat' size='lg' type='number' min='0' max='10000' placeholder='Hôtels' id='hotels' name='hotels' ref={register} />
                            </Col>

                            <Col>
                                <Form.Control
                                    required
                                    className='modal-stat'
                                    size='lg'
                                    type='number'
                                    min='0'
                                    max='200000'
                                    placeholder='Revenu Moy'
                                    id='averageIncome'
                                    name='averageIncome'
                                    ref={register}
                                />
                            </Col>

                            <Col>
                                <Form.Control required className='modal-stat' size='lg' type='number' min='0' max='20000000' placeholder='m²' id='surface' name='surface' ref={register} />
                            </Col>
                        </Row>

                        <Row className='row-modal'>
                            <Col md={10}>
                                <Checkbox checked={isEnabled} id='enabled' name='enabled' ref={register} onChange={handleEnabledCheckbox}>
                                    Activé
                                </Checkbox>
                            </Col>

                            <Col md={2}>
                                <Button variant='success' type='submit'>
                                    + Ajouter
                                </Button>
                            </Col>
                        </Row>

                        <br />

                        <Row className='modal-delete'>
                            <Form.Label className='delete-data' onClick={handleLocalStorageClear}>
                                Rafraichir les données
                            </Form.Label>
                        </Row>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

AddDestinationModal.propTypes = {
    handleModalVisibility: propTypes.func.isRequired,
    handleSubmit: propTypes.func.isRequired,
    addDestination: propTypes.func.isRequired,
    register: propTypes.func.isRequired,
    handleLocalStorageClear: propTypes.func.isRequired,
    handleEnabledCheckbox: propTypes.func.isRequired,
    modalVisibility: propTypes.bool.isRequired,
    isEnabled: propTypes.bool.isRequired,
};

export default AddDestinationModal;
