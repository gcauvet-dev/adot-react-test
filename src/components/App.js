import React, { useEffect, useState } from 'react';
import { Container, DropdownButton, Dropdown, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import '../assets/css/App.css';

import { AppLoader } from './Loader';
import Destination from './Destination';

import DestinationModal from './Modals/DestinationModal';
import DeleteDestinationModal from './Modals/DeleteDestinationModal';

import { getDestinationFromRestCountries } from '../services/destination.services';

import DestinationContext from '../helpers/Contexts/DestinationContext';
import useLocalStorage from '../helpers/Hooks/useLocalStorage';
import { getRandomValuesFromArray } from '../helpers/Misc/getRandom';

import countryList from '../helpers/Enums/countryList';
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

    const [selectedCountry, setSelectedCountry] = useState('');

    // Destinations
    const [destinations, setDestinations] = useLocalStorage('destinations', []);
    const handleLocalStorageClear = () => setDestinations([]);

    const [selectedDestinationUid, setSelectedDestinationUid] = useState('');
    const handleSelectedDestinationUid = (type, uid) => {
        setSelectedDestinationUid(uid);

        if (type === destinationImageActionTypes.REFRESH) handleDestinationRefresh();
        else if (type === destinationImageActionTypes.DELETE) handleDeleteDestinationModalVisibility();
        else setAlert({ message: 'Failed to get action type', variant: 'danger' });
    };

    // Life cycle
    useEffect(() => {
        const fetchData = async () => {
            const randomCountryCodes = getRandomValuesFromArray(countryList, 5);
            const randomDestinations = randomCountryCodes.map((country) => getDestinationFromRestCountries(country.value));

            const results = await Promise.all(randomDestinations);
            results.length > 0 ? setDestinations(results) : setAlert({ message: 'Failed to get destination from API', variant: 'danger' });
        };

        if (destinations.length === 0) fetchData();
    });

    useEffect(() => {
        if (!destinationModalVisibility && !deleteDestinationModalVisibility) setSelectedDestinationUid('');
    }, [selectedDestinationUid, destinationModalVisibility, deleteDestinationModalVisibility]);

    // CRUD
    const addDestination = async () => {
        handleDestinationModalVisibility();

        if (selectedCountry) {
            const newDestination = await getDestinationFromRestCountries(selectedCountry);
            !newDestination.message ? setDestinations([newDestination, ...destinations]) : setAlert({ message: newDestination.message, variant: 'danger' });
            setSelectedCountry('');
        }
    };

    const deleteDestination = async () => {
        await setDestinations(destinations.filter((destination) => destination.uid !== selectedDestinationUid));
        handleDeleteDestinationModalVisibility();
        setAlert({ message: 'La destination à été supprimée.', variant: 'success' });
    };

    const handleDestinationRefresh = () => {};

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

                <InputGroup.Append>
                    <DropdownButton title='Actions' variant='outline-success' bsPrefix='action-button' size='lg'>
                        <Dropdown.Item onClick={handleDestinationModalVisibility}>
                            <FontAwesomeIcon color='#28a745' icon={faPlusSquare} /> Add
                        </Dropdown.Item>

                        <Dropdown.Item onClick={handleLocalStorageClear}>
                            <FontAwesomeIcon color='#28a745' icon={faSyncAlt} /> Refresh
                        </Dropdown.Item>
                    </DropdownButton>
                </InputGroup.Append>
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
 * carouselle images
 * Reload individual image
 * info from wiki
 * images credit
 * export button
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
 * height root 100%
 * Image exeded probleme no replace
 * Can't perform a React state update on an unmounted component
 * Using UNSAFE_componentWillReceiveProps
 * findDOMNode is deprecated in StrictMode. findDOMNode
 */
