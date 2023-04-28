const {
  noTextError,
  noToCaseError,
  invalidToCaseError,
} = require('./constants');

const toCases = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

const getURLErrors = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    errors.push(noTextError);
  }

  if (!toCase) {
    errors.push(noToCaseError);
  } else if (!toCases.includes(toCase)) {
    errors.push(invalidToCaseError);
  }

  return errors;
};

module.exports.getURLErrors = getURLErrors;
