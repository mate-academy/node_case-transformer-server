const {
  CASES,
  ERROR_MISSING_TEXT,
  ERROR_MISSING_TO_CASE,
  ERROR_INVALID_TO_CASE,
} = require('./constants');

function validateRequest(textFromUrl, caseFromUrl) {
  const errors = [];

  if (!textFromUrl) {
    errors.push({ message: ERROR_MISSING_TEXT });
  }

  if (!caseFromUrl) {
    errors.push({ message: ERROR_MISSING_TO_CASE });
  }

  if (caseFromUrl && !CASES.includes(caseFromUrl)) {
    errors.push({ message: ERROR_INVALID_TO_CASE });
  }

  return errors;
}

module.exports = { validateRequest };
