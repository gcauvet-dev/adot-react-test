import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, DropdownButton, Dropdown, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import '../assets/css/App.css';

import { AppLoader } from './Loader';
import Destination from './Destination';

import DestinationModal from './Modals/DestinationModal';
import DeleteDestinationModal from './Modals/DeleteDestinationModal';

import { getDestinationsFromRandomDataAPI } from '../services/destination.services';

import DestinationContext from '../helpers/Contexts/DestinationContext';
import useLocalStorage from '../helpers/Hooks/useLocalStorage';
import { parseDestination } from '../helpers/Parsers/destinationParser';

import destinationImageActionTypes from '../helpers/Enums/DestinationImageActionTypes';

const App = () => {
    // UI
    const [alert, setAlert] = useState('');
    const autoHideAlert = setTimeout(() => {
        setAlert('');
    }, 8000);

    const [destinationModalVisibility, setDestinationModalVisibility] = useState(false);
    const handleDestinationModalVisibility = () => setDestinationModalVisibility(!destinationModalVisibility);

    const [deleteDestinationModalVisibility, setDeleteDestinationModalVisibility] = useState(false);
    const handleDeleteDestinationModalVisibility = () => setDeleteDestinationModalVisibility(!deleteDestinationModalVisibility);

    const [isVisited, setVisited] = useState(true);
    const handleVisitedCheckbox = () => setVisited(!isVisited);

    const [searchTerm, setSearchTerm] = useState('');

    const { register, handleSubmit } = useForm();

    // Destinations
    const [destinations, setDestinations] = useLocalStorage('destinations', []);
    const handleLocalStorageClear = () => setDestinations([]);

    const [selectedDestinationUid, setSelectedDestinationUid] = useState('');
    const handleSelectedDestinationUid = (type, uid) => {
        setSelectedDestinationUid(uid);

        if (type === destinationImageActionTypes.EDIT) handleDestinationModalVisibility();
        else if (type === destinationImageActionTypes.DELETE) handleDeleteDestinationModalVisibility();
        else setAlert({ message: 'Failed to get action type', variant: 'danger' });
    };

    // Life cycle
    useEffect(() => {
        const fetchData = async () => {
            const result = await getDestinationsFromRandomDataAPI();
            result.length > 0 ? setDestinations(result) : setAlert({ message: result.message, variant: 'danger' });
        };

        if (destinations.length === 0) fetchData();
    }, [destinations, setDestinations]);

    useEffect(() => {
        if (!destinationModalVisibility && !deleteDestinationModalVisibility) setSelectedDestinationUid('');
    }, [selectedDestinationUid, destinationModalVisibility, deleteDestinationModalVisibility]);

    // CRUD
    const addDestination = (newDestination) => {
        setDestinations([...destinations, parseDestination(newDestination)]);
        handleDestinationModalVisibility();
    };

    const deleteDestination = async () => {
        await setDestinations(destinations.filter((destination) => destination.uid !== selectedDestinationUid));
        handleDeleteDestinationModalVisibility();
        setAlert({ message: 'La destination à été supprimée.', variant: 'success' });
    };

    // Other
    const handleEnableSwitch = (checked, evt, id) => setDestinations(destinations.map((destination) => (destination.uid === id ? { ...destination, visited: checked } : destination)));

    const handleSearchBar = (event) => {
        const {
            target: { value },
        } = event;

        setSearchTerm(value.toLowerCase());
    };

    const search = (destination) => {
        const { fullAddress, country, city } = destination;
        return fullAddress.toLowerCase().includes(searchTerm) || country.toLowerCase().includes(searchTerm) || city.toLowerCase().includes(searchTerm);
    };

    return (
        <Container className='main'>
            {alert && (
                <Alert variant={alert.variant} onClose={autoHideAlert}>
                    {alert.message}
                </Alert>
            )}

            <InputGroup>
                <FormControl className='searchbar' placeholder='Recherche par adresse, ville, pays, etc...' aria-label='Search' aria-describedby='basic-addon2' onChange={handleSearchBar} />

                <InputGroup.Append>
                    <DropdownButton title='Actions' variant='outline-success' bsPrefix='action-button' size='lg'>
                        <Dropdown.Item eventKey='1' onClick={handleDestinationModalVisibility}>
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
                                    <Destination handleEnableSwitch={handleEnableSwitch} handleSelectedDestinationUid={handleSelectedDestinationUid} />
                                </DestinationContext.Provider>
                            )
                    )
                ) : (
                    <Container className='centered-container'>
                        <AppLoader />
                    </Container>
                )}
            </Container>

            <DestinationModal
                handleDestinationModalVisibility={handleDestinationModalVisibility}
                isVisited={isVisited}
                handleVisitedCheckbox={handleVisitedCheckbox}
                destinationModalVisibility={destinationModalVisibility}
                handleSubmit={handleSubmit}
                addDestination={addDestination}
                register={register}
            />

            <DeleteDestinationModal
                handleDeleteDestinationModalVisibility={handleDeleteDestinationModalVisibility}
                deleteDestinationModalVisibility={deleteDestinationModalVisibility}
                deleteDestination={deleteDestination}
            />
        </Container>
    );
};

export default App;

/* TODO: {GENERAL}
 * Edit
 * Tests
 * carouselle images
 * Reload individual image
 * Wiki API
 */

/* TODO: {UI}
 * Random image for new
 * Image orientation from API
 * Hover icon style
 * Action button style hover
 */

/* FIXME:
 * unique "key" prop. socials
 * wrong country flag
 * height root 100%
 * default flag by country
 */
