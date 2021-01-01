import React from 'react';
import propTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Checkbox } from 'pretty-checkbox-react';
import FocusedInput from '../FocusedInput';

import '../../assets/css/DestinationModal.css';

const DestinationModal = ({ isVisited, handleVisitedCheckbox, handleDestinationModalVisibility, destinationModalVisibility, handleSubmit, addDestination, register }) => (
    <Modal autoFocus={false} size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={destinationModalVisibility} onHide={handleDestinationModalVisibility}>
        <Modal.Body className='destinationModal'>
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
                        <Col md={9}>
                            <Checkbox checked={isVisited} id='visited' name='visited' ref={register} onChange={handleVisitedCheckbox}>
                                J&apos;ai déjà visité cet endroit
                            </Checkbox>
                        </Col>

                        <Col md={3}>
                            <Button variant='success' type='submit'>
                                <FontAwesomeIcon color='#fff' icon={faSave} /> Sauvegarder
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>
);

DestinationModal.propTypes = {
    handleDestinationModalVisibility: propTypes.func.isRequired,
    handleSubmit: propTypes.func.isRequired,
    addDestination: propTypes.func.isRequired,
    register: propTypes.func.isRequired,
    handleVisitedCheckbox: propTypes.func.isRequired,
    destinationModalVisibility: propTypes.bool.isRequired,
    isVisited: propTypes.bool.isRequired,
};

export default DestinationModal;
