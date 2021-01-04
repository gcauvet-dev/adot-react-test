const getRandomNumber = (max, min) => Math.floor(Math.random() * max) + min;
const getRandomBool = (length) => Math.random() <= length;
const getRandomValuesFromArray = (array, n) => array.sort(() => 0.5 - Math.random()).slice(0, n);

export { getRandomNumber, getRandomBool, getRandomValuesFromArray };
