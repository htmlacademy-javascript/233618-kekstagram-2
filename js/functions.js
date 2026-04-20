const isCorrectLength = function (string, maxLength) {
  return string.length <= maxLength;
};

const isPalindrome = function (string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    reversedString += normalizeString[i];
  }

  return normalizeString === reversedString;
};

const getNumbers = function (argument) {
  const string = Number.isFinite(argument) ? argument.toString() : argument;
  let numbers = '';

  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i]);

    if (!Number.isNaN(number)) {
      numbers += string[i];
    }
  }

  return parseInt(numbers);
};
