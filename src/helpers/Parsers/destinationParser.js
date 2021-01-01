import { v4 as uuidv4 } from 'uuid';
import { getRandomBool, getRandomNumber } from '../Misc/getRandom';

const parseDestinationFromAPI = (address) => {
    const { full_address: fullAddress, uid, city, country, country_code: countryCode } = address;

    return {
        fullAddress,
        uid,
        city,
        country,
        countryCode,
        images: {
            flag: `https://www.countryflags.io/${countryCode.toLowerCase()}/flat/64.png`,
            url: '',
            alt: countryCode,
        },
        visited: getRandomBool(0.7),
        statistics: {
            population: getRandomNumber(500000, 50000),
            hotels: getRandomNumber(400, 100),
            averageIncome: getRandomNumber(30000, 3000),
            surface: getRandomNumber(170000, 90000),
        },
    };
};

const parseDestination = (newDestination) => {
    const { city, visited, fullAddress, population, hotels, averageIncome, surface } = newDestination;

    return {
        city,
        visited,
        fullAddress,
        country: 'world',
        countryCode: 'FR',
        uid: uuidv4(),
        images: {
            flag: `https://www.countryflags.io/fr/shiny/64.png`,
            url: '',
            alt: 'FR',
        },
        statistics: {
            population,
            hotels,
            averageIncome,
            surface,
        },
    };
};

export { parseDestination, parseDestinationFromAPI };
