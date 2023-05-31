'use strict';

const errorMessages = require('./errorMessages');
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function checkParams(textToConvert, neededCase) {
  const validation = {
    errors: [],
  };

  if (!textToConvert) {
    validation.errors.push({ message: errorMessages.textRequired });
  }

  if (!neededCase) {
    validation.errors.push({ message: errorMessages.neededCaseRequired });
  }

  if (!availableCases.includes(neededCase) && neededCase) {
    validation.errors.push(
      { message: errorMessages.notSuportedCase(availableCases) },
    );
  }

  return validation;
}

module.exports = { checkParams };
