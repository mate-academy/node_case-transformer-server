const { VALID_CASES, ERROR_MESSAGES } = require('./constants');

function validate(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({ message: ERROR_MESSAGES.TEXT_REQUIRED });
  }

  if (!toCase) {
    errors.push({ message: ERROR_MESSAGES.QUERY_REQUIRED });
  } else if (!Object.keys(VALID_CASES).includes(toCase)) {
    errors.push({
      message: `${ERROR_MESSAGES.CASE_NOT_SUPPORTED} ${Object.keys(VALID_CASES).join(', ')}.`,
    });
  }

  return errors;
}

module.exports = { validate };
