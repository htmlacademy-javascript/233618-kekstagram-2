const checkStringLength = (string, maxLength) => string.length <= maxLength;

const checkForPalindrome = (string) => {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let left = 0;
  let right = normalizeString.length - 1;

  while(left < right) {
    if(normalizeString[left] !== normalizeString[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
};

const parseNumbers = (argument) => {
  const string = Number.isFinite(argument) ? argument.toString() : argument;
  let numbers = '';

  for(const char of string) {
    const number = parseInt(char);

    if (!Number.isNaN(number)) {
      numbers += char;
    }
  }

  return parseInt(numbers);
};
