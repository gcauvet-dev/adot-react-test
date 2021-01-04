import axios from 'axios';
// import wtf from 'wtf_wikipedia';

import parseDestinationFromRestCountries from '../helpers/Parsers/destinationParser';
import parseImage from '../helpers/Parsers/imageParser';

const getDestinationFromRestCountries = (query) =>
    axios
        .get(`https://restcountries.eu/rest/v2/alpha/${query}?fields=name;capital;population;area;languages;flag;alpha2Code`)
        .then((country) => parseDestinationFromRestCountries(country.data))
        .catch((err) => err);

const getImage = async (country) =>
    axios
        .get(
            `https://api.unsplash.com/search/photos?page=1
            &per_page=1
            &landscape
            &query=${country}
            &client_id=kHivcP5EXrCVXpgCYCP41tAcydkQozCyz__1CQiLG-s`
        )
        .then((image) => parseImage(image.data.results))
        .catch((err) => err);

// const getDestinationFromWikipedia = async (query) =>
//     wtf
//         .fetch(query, 'en')
//         .then((article) => parseDestinationFromWikipedia(article, query))
//         .catch((err) => err);

export { getDestinationFromRestCountries, getImage };
