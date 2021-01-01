import axios from 'axios';

import { getRandomNumber } from '../helpers/Misc/getRandom';
import { parseDestinationFromAPI } from '../helpers/Parsers/destinationParser';
import parseImage from '../helpers/Parsers/imageParser';

const getFlag = (country) =>
    axios
        .get(`https://restcountries.eu/rest/v2/name/${country}?fields=flag`)
        .then((flag) => flag)
        .catch((err) => err);

const getImage = async (country) =>
    axios
        .get(
            `https://api.unsplash.com/search/photos?page=1
            &per_page=1
            &query=${country}
            &client_id=kHivcP5EXrCVXpgCYCP41tAcydkQozCyz__1CQiLG-s`
        )
        .then((image) => parseImage(image.data.results))
        .catch(() =>
            getFlag(country)
                .then((response) => response.data.flag)
                .catch((err) => err)
        );

const getDestinationsFromRandomDataAPI = () =>
    axios
        .get(`https://random-data-api.com/api/address/random_address?size=${getRandomNumber(5, 3)}`)
        .then((response) => response.data.map((data) => parseDestinationFromAPI(data)))
        .catch((err) => err);

const getDestinationsFromWikipedia = (country) =>
    axios
        .get(`https://fr.wikipedia.org/w/api.php?action=query&titles=${country}&prop=revisions&rvprop=content&rvsection=0&format=json`)
        .then((response) => console.log(response))
        .catch(() =>
            getDestinationsFromRandomDataAPI()
                .then((data) => parseDestinationFromAPI(data))
                .catch((err) => err)
        );

export { getDestinationsFromRandomDataAPI, getDestinationsFromWikipedia, getImage };
