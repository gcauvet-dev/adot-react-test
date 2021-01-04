import { v4 as uuidv4 } from 'uuid';

const parseDestinationFromRestCountries = (country) => {
    const { alpha2Code: countryCode, area, capital, flag, languages, name, population, visited } = country;

    return {
        capital,
        country: name,
        countryCode,
        uid: uuidv4(),
        visited,
        images: {
            flag,
            url: '',
            alt: name,
        },
        statistics: {
            population,
            languages: languages[0].name,
            area,
        },
    };
};

export default parseDestinationFromRestCountries;
