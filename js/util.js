const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const getRandomItemFrom = (items) =>
  items[getRandomNumber(0, items.length - 1)];
const isEscapeKey = (event) => event.key === 'Escape';
const isEnterKey = (event) => event.key === 'Enter';
const isSpaceKey = (event) => event.key === ' ';

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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomNumber,
  getRandomItemFrom,
  isEscapeKey,
  isEnterKey,
  isSpaceKey,
  parseNumbers,
  debounce,
};
