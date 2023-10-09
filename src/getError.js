'use strict';

const {
  NO_TEXT_MESSAGE,
  NO_CASE_MESSAGE,
  CASES,
  INVALID_CASE_MESSAGE,
} = require('./constants');

function getErrors(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: NO_TEXT_MESSAGE,
    });
  }

  if (!toCase) {
    errors.push({
      message: NO_CASE_MESSAGE,
    });
  }

  if (!CASES.includes(toCase) && toCase) {
    errors.push({
      message: INVALID_CASE_MESSAGE,
    });
  }

  return errors;
}

module.exports = { getErrors };
