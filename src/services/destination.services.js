import axios from 'axios';
import wtf from 'wtf_wikipedia';

import { parseDestinationFromWikipedia } from '../helpers/Parsers/destinationParser';
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

const getDestinationFromWikipedia = async (country) =>
    wtf
        .fetch(country, 'en')
        .then((response) => parseDestinationFromWikipedia(response))
        .catch((err) => err);

export { getDestinationFromWikipedia, getImage };
