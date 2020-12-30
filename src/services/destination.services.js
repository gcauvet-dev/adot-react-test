import axios from 'axios';

import { getRandomNumber } from '../helpers/getRandom';
import { parseDestinationFromAPI } from '../helpers/destinationParser';
import parseImage from '../helpers/imageParser';

const getFlag = (countryCode) =>
    axios
        .get(`https://restcountries.eu/rest/v2/alpha/${countryCode}?fields=flag`)
        .then((flag) => flag)
        .catch((err) => console.log(err));

const getImage = async (country, countryCode) =>
    axios
        .get(
            `https://api.unsplash.com/search/photos?page=1
            &per_page=1
            &query=${country}
            &client_id=kHivcP5EXrCVXpgCYCP41tAcydkQozCyz__1CQiLG-s`
        )
        .then((image) => parseImage(image.data.results))
        .catch(() =>
            getFlag(countryCode)
                .then((response) => response.data.flag)
                .catch((err) => console.log(err))
        );

const getDestinationsFromAPI = () =>
    axios
        .get(`https://random-data-api.com/api/address/random_address?size=${getRandomNumber(15, 10)}`)
        .then((response) => response.data.map((data) => parseDestinationFromAPI(data)))
        .catch((err) => console.log(err));

export { getDestinationsFromAPI, getImage };
