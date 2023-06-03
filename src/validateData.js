'use strict';

const errorMessages = require('./errorMessages');

function validateData(text, textCase) {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const validation = {
    errors: [],
  };

  if (!cases.includes(textCase) && textCase) {
    validation.errors.push({
      message: errorMessages.INVALID_CASE,
    });
  }

  if (!text) {
    validation.errors.push({
      message: errorMessages.TEXT_REQUIRED,
    });
  }

  if (!textCase) {
    validation.errors.push({
      message: errorMessages.TOCASE_REQUIRED,
    });
  }

  return validation;
}

module.exports.validateData = validateData;
