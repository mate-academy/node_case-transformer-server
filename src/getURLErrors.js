const {
  noText,
  noToCase,
  invalidToCase,
} = require('./constants').errorMessages;

const { createError } = require('./createError');

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
    const noTextError = createError(noText);

    errors.push(noTextError);
  }

  if (!toCase) {
    const noToCaseError = createError(noToCase);

    errors.push(noToCaseError);
  }

  if (toCase && !toCases.includes(toCase)) {
    const invalidToCaseError = createError(invalidToCase);

    errors.push(invalidToCaseError);
  }

  return errors;
};

module.exports.getURLErrors = getURLErrors;
