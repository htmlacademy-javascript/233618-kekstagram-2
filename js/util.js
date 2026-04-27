const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomItemFrom = (items) => items[getRandomNumber(0, items.length - 1)];

export { getRandomNumber, getRandomItemFrom };
