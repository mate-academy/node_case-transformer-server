/* eslint-disable max-lines */

const {
  TEXT_TO_CONVERT_ERROR,
  TO_CASE_ERROR,
  NOT_SUPPORTED_CASE,
  SUPPORTED_CASES,
} = require('./utils/errorMessages');

function validate(targetWord, toCase) {
  const errorsArray = [];

  if (!targetWord) {
    errorsArray.push({
      message: TEXT_TO_CONVERT_ERROR,
    });
  }

  if (!toCase) {
    errorsArray.push({
      message: TO_CASE_ERROR,
    });
  }

  if (toCase && !SUPPORTED_CASES.includes(toCase)) {
    errorsArray.push({
      message: NOT_SUPPORTED_CASE,
    });
  }

  return errorsArray;
}

module.exports = { validate };
