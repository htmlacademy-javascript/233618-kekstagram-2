const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const getRandomItemFrom = (items) =>
  items[getRandomNumber(0, items.length - 1)];
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';
const isSpaceKey = (evt) => evt.key === ' ';

const parseNumbers = (argument) => {
  const string = Number.isFinite(argument) ? argument.toString() : argument;
  let numbers = '';

  for (const char of string) {
    const number = parseInt(char, 2);

    if (!Number.isNaN(number)) {
      numbers += char;
    }
  }

  return parseInt(numbers, 2);
};

export {
  getRandomNumber,
  getRandomItemFrom,
  isEscapeKey,
  isEnterKey,
  isSpaceKey,
  parseNumbers,
};
