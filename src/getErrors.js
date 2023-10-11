const {
  NO_TEXT_ERROR_MESSAGE,
  NO_CASE_ERROR_MESSAGE,
  INVALID_CASE_ERROR_MESSAGE,
} = require('./constatnts');

function getError(textFromUrl, caseFromUrl, ALLOWED_CASES) {
  const errors = {
    errors: [],
  };

  if (textFromUrl === '') {
    errors.errors.push({ message: NO_TEXT_ERROR_MESSAGE });
  }

  if (!caseFromUrl) {
    errors.errors.push({ message: NO_CASE_ERROR_MESSAGE });
  }

  if (caseFromUrl && !ALLOWED_CASES.includes(caseFromUrl)) {
    errors.errors.push({ message: INVALID_CASE_ERROR_MESSAGE });
  }

  return errors;
}

module.exports = {
  getError,
};
