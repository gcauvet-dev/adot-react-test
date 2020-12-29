import { getRandomBool, getRandomNumber } from './getRandom';

const parseDestination = (address) => {
    const { full_address: fullAdress, uid, city } = address;

    return {
        fullAdress,
        uid,
        city,
        enabled: getRandomBool(0.7),
        statistics: {
            population: getRandomNumber(500000, 50000),
            hotels: getRandomNumber(400, 100),
            averageIncome: getRandomNumber(30000, 3000),
            surface: getRandomNumber(170000, 90000),
        },
    };
};

export default parseDestination;
