const {
  errorMessages,
  toCases,
} = require('./constants');

const {
  noText,
  noToCase,
  invalidToCase,
} = errorMessages;

const getURLErrors = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    const noTextError = {
      message: noText,
    };

    errors.push(noTextError);
  }

  if (!toCase) {
    const noToCaseError = {
      message: noToCase,
    };

    errors.push(noToCaseError);
  }

  if (toCase && !toCases.includes(toCase)) {
    const invalidToCaseError = {
      message: invalidToCase,
    };

    errors.push(invalidToCaseError);
  }

  return errors;
};

module.exports.getURLErrors = getURLErrors;
