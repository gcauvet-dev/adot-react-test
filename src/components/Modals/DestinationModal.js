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
                <Form.Label className='modal-title'>Add a destination</Form.Label>

                <Form.Group>
                    <Form.Control required className='modal-capital' size='lg' type='text' placeholder='Capital name' id='capital' name='capital' ref={register} />

                    <FocusedInput register={register} id='address' name='address' placeholder='Address' />

                    <Row>
                        <Col>
                            <Form.Control required className='modal-stat' size='lg' type='number' min='0' max='20000000' placeholder='Population' id='population' name='population' ref={register} />
                        </Col>

                        <Col>
                            <Form.Control required className='modal-stat' size='lg' type='number' min='0' max='1000000' placeholder='Languages' id='languages' name='languages' ref={register} />
                        </Col>

                        <Col>
                            <Form.Control
                                required
                                className='modal-stat'
                                size='lg'
                                type='number'
                                min='0'
                                max='200000'
                                placeholder='Average income'
                                id='averageIncome'
                                name='averageIncome'
                                ref={register}
                            />
                        </Col>

                        <Col>
                            <Form.Control required className='modal-stat' size='lg' type='number' min='0' max='20000000' placeholder='km²' id='surface' name='surface' ref={register} />
                        </Col>
                    </Row>

                    <Row className='row-modal'>
                        <Col md={10}>
                            <Checkbox checked={isVisited} id='visited' name='visited' ref={register} onChange={handleVisitedCheckbox}>
                                I already visited this place
                            </Checkbox>
                        </Col>

                        <Col md={2}>
                            <Button variant='success' type='submit'>
                                <FontAwesomeIcon color='#fff' icon={faSave} /> Save
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
