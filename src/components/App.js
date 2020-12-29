import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Button, Row, Col } from 'react-bootstrap';

import { v4 as uuidv4 } from 'uuid';

import '../assets/css/App.css';

import Destination from './Destination';
import AddDestinationModal from './Modals/AddDestinationModal';

import { getDestinationsFromAPI } from '../services/destination.services';

import DestinationContext from '../helpers/Contexts/DestinationContext';
import useLocalStorage from '../helpers/Hooks/useLocalStorage';

const handleSwitch = () => {};

const App = () => {
    const [destinations, setDestinations] = useLocalStorage('destinations', []);
    const handleLocalStorageClear = () => setDestinations([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDestinationsFromAPI();
            result ? setDestinations(result) : new Error('Error while fetching from API');
        };

        if (destinations.length === 0) fetchData();
    }, [destinations, setDestinations]);

    const [modalVisibility, setModalVisibility] = useState(false);
    const handleModalVisibility = () => setModalVisibility(!modalVisibility);

    const [isChecked, setChecked] = useState(true);
    const handleEnabledCheckbox = () => setChecked(!isChecked);

    const { register, handleSubmit } = useForm();

    const addDestination = (newDestination) => {
        const { city, enabled, fullAdress, population, hotels, averageIncome, surface } = newDestination;

        setDestinations([
            ...destinations,
            {
                city,
                enabled,
                fullAdress,
                uid: uuidv4(),
                statistics: {
                    population,
                    hotels,
                    averageIncome,
                    surface,
                },
            },
        ]);

        handleModalVisibility();
    };

    return (
        <Container className='main'>
            <Row>
                <Col sm={10}>
                    <div className='app-title'>Destinations</div>
                </Col>

                <Col sm={2}>
                    <Button className='checkbox-label' variant='success' onClick={handleModalVisibility}>
                        + Ajouter
                    </Button>
                </Col>
            </Row>

            <Container className='app-container'>
                {destinations.map((destination) => (
                    <DestinationContext.Provider value={destination}>
                        <Destination handleSwitch={handleSwitch} />
                    </DestinationContext.Provider>
                ))}
            </Container>

            <AddDestinationModal
                handleModalVisibility={handleModalVisibility}
                isChecked={isChecked}
                handleEnabledCheckbox={handleEnabledCheckbox}
                modalVisibility={modalVisibility}
                handleLocalStorageClear={handleLocalStorageClear}
                handleSubmit={handleSubmit}
                addDestination={addDestination}
                register={register}
            />
        </Container>
    );
};

export default App;

// TODO: Switch state managment
// TODO: Delete
// TODO: Search
// TODO: Image
