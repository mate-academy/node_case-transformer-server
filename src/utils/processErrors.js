const { ERRORS, SUPPORTED_CASES } = require('./constants');

function processErrors(requestedText, requestedCase) {
  const errors = [];

  if (!requestedText) {
    errors.push({ message: ERRORS.NO_TEXT_ERROR });
  }

  if (!requestedCase) {
    errors.push({ message: ERRORS.NO_CASE_ERROR });
  }

  if (requestedCase && !SUPPORTED_CASES.includes(requestedCase)) {
    errors.push({ message: ERRORS.INVALID_CASE_ERROR });
  }

  return errors;
}

module.exports = { processErrors };
