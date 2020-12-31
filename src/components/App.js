import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, DropdownButton, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import '../assets/css/App.css';

import { AppLoader } from './Loader';
import Destination from './Destination';

import AddDestinationModal from './Modals/AddDestinationModal';

import { getDestinationsFromAPI } from '../services/destination.services';

import { parseDestination } from '../helpers/destinationParser';
import DestinationContext from '../helpers/Contexts/DestinationContext';
import useLocalStorage from '../helpers/Hooks/useLocalStorage';

const App = () => {
    const [destinations, setDestinations] = useLocalStorage('destinations', []);
    const handleLocalStorageClear = () => setDestinations([]);

    const [modalVisibility, setModalVisibility] = useState(false);
    const handleModalVisibility = () => setModalVisibility(!modalVisibility);

    const [isEnabled, setEnabled] = useState(true);
    const handleEnabledCheckbox = () => setEnabled(!isEnabled);

    const [searchTerm, setSearchTerm] = useState('');

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDestinationsFromAPI();
            result ? setDestinations(result) : new Error('Error while fetching from API');
        };

        if (destinations.length === 0) fetchData();
    }, [destinations, setDestinations]);

    const addDestination = (newDestination) => {
        setDestinations([...destinations, parseDestination(newDestination)]);
        handleModalVisibility();
    };

    const handleEnableSwitch = (checked, evt, id) => setDestinations(destinations.map((destination) => (destination.uid === id ? { ...destination, enabled: checked } : destination)));

    const handleSearchBar = (event) => {
        const {
            target: { value },
        } = event;

        setSearchTerm(value);
    };

    const search = (destination) => {
        const { fullAddress, country, city } = destination;
        return fullAddress.toLowerCase().includes(searchTerm) || country.toLowerCase().includes(searchTerm) || city.toLowerCase().includes(searchTerm);
    };

    return (
        <Container className='main'>
            <InputGroup>
                <FormControl className='searchbar' placeholder='Search by address, country, city, etc...' aria-label='Search' aria-describedby='basic-addon2' onChange={handleSearchBar} />

                <InputGroup.Append>
                    <DropdownButton title='Actions' variant='outline-success' className='action-button' size='lg'>
                        <Dropdown.Item eventKey='1' onClick={handleModalVisibility}>
                            <FontAwesomeIcon color='#28a745' icon={faPlusSquare} /> Ajouter
                        </Dropdown.Item>

                        <Dropdown.Item eventKey='2' onClick={handleLocalStorageClear}>
                            <FontAwesomeIcon color='#28a745' icon={faSyncAlt} /> Rafraichir
                        </Dropdown.Item>
                    </DropdownButton>
                </InputGroup.Append>
            </InputGroup>

            <div className='app-title'>Destinations</div>

            <Container className='app-container'>
                {destinations ? (
                    destinations.map(
                        (destination) =>
                            search(destination) && (
                                <DestinationContext.Provider key={uuidv4()} value={destination}>
                                    <Destination handleEnableSwitch={handleEnableSwitch} />
                                </DestinationContext.Provider>
                            )
                    )
                ) : (
                    <Container className='centered-container'>
                        <AppLoader />
                    </Container>
                )}
            </Container>

            <AddDestinationModal
                handleModalVisibility={handleModalVisibility}
                isEnabled={isEnabled}
                handleEnabledCheckbox={handleEnabledCheckbox}
                modalVisibility={modalVisibility}
                handleSubmit={handleSubmit}
                addDestination={addDestination}
                register={register}
            />
        </Container>
    );
};

export default App;

// TODO: Delete
// TODO: Edit
// TODO: Errors
// TODO: Tests
// TODO: Random image for new
