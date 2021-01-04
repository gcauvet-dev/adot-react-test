import React from 'react';
import propTypes from 'prop-types';

import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import { Checkbox } from 'pretty-checkbox-react';
import Select from 'react-select';

import countryList from '../../helpers/Enums/countryList';

import '../../assets/css/DestinationModal.css';

const DestinationModal = ({ handleVisitedCheckbox, handleDestinationModalVisibility, handleSelectChange, addDestination, isVisited, destinationModalVisibility }) => (
    <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={destinationModalVisibility} onHide={handleDestinationModalVisibility}>
        <Modal.Body className='destinationModal'>
            <Form>
                <Form.Label className='modal-title'>Select a destination</Form.Label>

                <Form.Group>
                    <Select options={countryList} onChange={handleSelectChange} />

                    <Row className='row-modal'>
                        <Col md={10}>
                            <Checkbox checked={isVisited} id='visited' name='visited' onChange={handleVisitedCheckbox}>
                                I already visited this place
                            </Checkbox>
                        </Col>

                        <Col md={2}>
                            <Button variant='success' onClick={addDestination}>
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
    addDestination: propTypes.func.isRequired,
    handleSelectChange: propTypes.func.isRequired,
    handleVisitedCheckbox: propTypes.func.isRequired,
    destinationModalVisibility: propTypes.bool.isRequired,
    isVisited: propTypes.bool.isRequired,
};

export default DestinationModal;
