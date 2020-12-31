import axios from 'axios';

import { getRandomNumber } from '../helpers/Misc/getRandom';
import { parseDestinationFromAPI } from '../helpers/Parsers/destinationParser';
import parseImage from '../helpers/Parsers/imageParser';

const getFlag = (countryCode) =>
    axios
        .get(`https://restcountries.eu/rest/v2/alpha/${countryCode}?fields=flag`)
        .then((flag) => flag)
        .catch(() => `https://www.countryflags.io/${countryCode.toLowerCase()}/shiny/64.png`);

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
                .catch((err) => err)
        );

const getDestinationsFromAPI = () =>
    axios
        .get(`https://random-data-api.com/api/address/random_address?size=${getRandomNumber(5, 3)}`)
        .then((response) => response.data.map((data) => parseDestinationFromAPI(data)))
        .catch((err) => err);

export { getDestinationsFromAPI, getImage };
