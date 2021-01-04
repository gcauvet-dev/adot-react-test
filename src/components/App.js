import React, { useEffect, useState } from 'react';
import { Container, InputGroup, FormControl, Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import { AppLoader } from './Loader';
import Destination from './Destination';

import DestinationModal from './Modals/DestinationModal';
import DeleteDestinationModal from './Modals/DeleteDestinationModal';

import { getDestinationFromRestCountries } from '../services/destination.services';

import DestinationContext from '../helpers/Contexts/DestinationContext';
import useLocalStorage from '../helpers/Hooks/useLocalStorage';

import destinationImageActionTypes from '../helpers/Enums/DestinationImageActionTypes';

import '../assets/css/App.css';

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

    const [infoDestinationModalVisibility, setInfoDestinationModalVisibility] = useState(false);
    const handleDestinationDisplayInfoVisibility = () => setInfoDestinationModalVisibility(!infoDestinationModalVisibility);

    const [isVisited, setVisited] = useState(true);
    const handleVisitedCheckbox = () => setVisited(!isVisited);

    const [searchTerm, setSearchTerm] = useState('');

    const [selectedCountry, setSelectedCountry] = useState('');

    // Destinations
    const [destinations, setDestinations] = useLocalStorage('destinations', []);

    const [selectedDestinationUid, setSelectedDestinationUid] = useState('');
    const handleSelectedDestinationUid = (type, uid) => {
        setSelectedDestinationUid(uid);

        if (type === destinationImageActionTypes.INFO) handleDestinationDisplayInfoVisibility();
        else if (type === destinationImageActionTypes.DELETE) handleDeleteDestinationModalVisibility();
        else setAlert({ message: 'Failed to get action type', variant: 'danger' });
    };

    useEffect(() => {
        if (!destinationModalVisibility && !deleteDestinationModalVisibility) setSelectedDestinationUid('');
    }, [selectedDestinationUid, destinationModalVisibility, deleteDestinationModalVisibility]);

    // CRUD
    const addDestination = async () => {
        handleDestinationModalVisibility();

        if (selectedCountry) {
            const newDestination = await getDestinationFromRestCountries(selectedCountry);
            !newDestination.message ? setDestinations([{ ...newDestination, visited: isVisited }, ...destinations]) : setAlert({ message: newDestination.message, variant: 'danger' });
            setSelectedCountry('');
        }
    };

    const deleteDestination = async () => {
        await setDestinations(destinations.filter((destination) => destination.uid !== selectedDestinationUid));
        handleDeleteDestinationModalVisibility();
        setAlert({ message: 'La destination à été supprimée.', variant: 'success' });
    };
    // Other
    const handleEnableSwitch = (checked, evt, id) => setDestinations(destinations.map((destination) => (destination.uid === id ? { ...destination, visited: checked } : destination)));
    const handleSelectChange = (selectedOption) => setSelectedCountry(selectedOption.value);

    const search = (destination) => destination.country.toLowerCase().includes(searchTerm) || destination.capital.toLowerCase().includes(searchTerm);

    const handleSearchBar = (event) => {
        const {
            target: { value },
        } = event;

        setSearchTerm(value.toLowerCase());
    };

    return (
        <Container className='main'>
            {alert && (
                <Alert variant={alert.variant} onClose={autoHideAlert}>
                    {alert.message}
                </Alert>
            )}

            <InputGroup>
                <FormControl className='searchbar' placeholder='Search by address, capital, country, etc...' aria-label='Search' aria-describedby='basic-addon2' onChange={handleSearchBar} />

                <Button variant='success' bsPrefix='action-button' onClick={handleDestinationModalVisibility}>
                    <FontAwesomeIcon color='#fff' icon={faPlusSquare} size='lg' />
                </Button>
            </InputGroup>

            <div className='app-title'>Destinations Checklist</div>

            <Container className='app-container'>
                {destinations.length > 0 ? (
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
                handleSelectChange={handleSelectChange}
                destinationModalVisibility={destinationModalVisibility}
                addDestination={addDestination}
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
 * Tests
 * Info from wiki
 * Images credits
 */

/* TODO: {UI}
 * Hover icon style
 * Action button style hover
 */

/* FIXME:
 * unique "key" prop. socials
 * updateDestinationImage rerequest each time
 * Enter on modal form reload page
 * Autofocus select
 * Image exeded probleme no replace
 * Can't perform a React state update on an unmounted component
 * Using UNSAFE_componentWillReceiveProps
 * findDOMNode is deprecated in StrictMode. findDOMNode
 */
