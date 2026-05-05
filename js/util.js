const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomItemFrom = (items) => items[getRandomNumber(0, items.length - 1)];
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';
const isSpaceKey = (evt) => evt.key === ' ';

export { getRandomNumber, getRandomItemFrom, isEscapeKey, isEnterKey, isSpaceKey };
