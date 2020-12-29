const getRandomNumber = (max, min) => Math.floor(Math.random() * max) + min;
const getRandomBool = (length) => Math.random() <= length;

export { getRandomNumber, getRandomBool };
