const {
  CASES,
  ERROR_MISSING_TEXT,
  ERROR_MISSING_TOCASE,
  ERROR_INVALID_TOCASE,
} = require('./constants');

function validateRequest(textFromUrl, caseFromUrl) {
  const errors = [];

  if (!textFromUrl) {
    errors.push({ message: ERROR_MISSING_TEXT });
  }

  if (!caseFromUrl) {
    errors.push({ message: ERROR_MISSING_TOCASE });
  }

  if (caseFromUrl && !CASES.includes(caseFromUrl)) {
    errors.push({ message: ERROR_INVALID_TOCASE });
  }

  return errors;
}

module.exports = { validateRequest };
