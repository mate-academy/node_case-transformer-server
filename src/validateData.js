const {
  NO_TEXT_ERR_MESSAGE,
  NO_CASE_ERR_MESSAGE,
  NO_AVAILABLE_CASE_ERR_MESSAGE,
  AVAILABLE_CASES,
} = require('./variables');

function validateData(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({ message: NO_TEXT_ERR_MESSAGE });
  }

  if (!toCase) {
    errors.push({ message: NO_CASE_ERR_MESSAGE });
  }

  if (toCase && !AVAILABLE_CASES.includes(toCase)) {
    errors.push({ message: NO_AVAILABLE_CASE_ERR_MESSAGE });
  }

  return errors;
}

module.exports = { validateData };
