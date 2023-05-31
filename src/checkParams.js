/* eslint-disable max-len */
'use strict';

const errorMessage = require('./errorMessage');
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function checkParams(textToConvert, toCase) {
  const validation = {
    errors: [],
  };

  if (!textToConvert) {
    validation.errors.push({ message: errorMessage.textRequired });
  }

  if (!toCase) {
    validation.errors.push({ message: errorMessage.toCaseRequired });
  }

  if (!availableCases.includes(toCase) && toCase) {
    validation.errors.push({ message: errorMessage.notSuportedCase(availableCases) });
  }

  return validation;
}

module.exports = { checkParams };
