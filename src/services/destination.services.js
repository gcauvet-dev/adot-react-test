import axios from 'axios';
import { getRandomNumber } from '../helpers/getRandom';
import parseDestination from '../helpers/destinationParser';

const getDestinationsFromAPI = () =>
    axios
        .get(`https://random-data-api.com/api/address/random_address?size=${getRandomNumber(20, 10)}`)
        .then((response) => response.data.map((data) => parseDestination(data)))
        .catch((err) => {
            throw new Error(err);
        });

const getImage = (query) =>
    axios
        .get(`https://api.unsplash.com/search/photos/?page=1&per_page=1&query=${query}&orientation=landscape&client_id=kHivcP5EXrCVXpgCYCP41tAcydkQozCyz__1CQiLG-s`)
        .then((data) => data.data.results[0].urls.small)
        .catch((err) => {
            throw new Error(err);
        });

export { getDestinationsFromAPI, getImage };
