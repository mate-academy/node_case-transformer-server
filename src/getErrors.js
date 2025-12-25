const {
  ERROR_INVALID_CASE,
  ERROR_NO_CASE,
  ERROR_NO_TEXT,
  cases,
} = require('./consts.js');

function getErrors(requestText, requestCase) {
  const errors = {
    errors: [],
  };

  if (!requestText) {
    errors.errors.push({ message: ERROR_NO_TEXT });
  }

  if (!requestCase) {
    errors.errors.push({ message: ERROR_NO_CASE });
  }

  if (requestCase && !cases.includes(requestCase)) {
    errors.errors.push({ message: ERROR_INVALID_CASE });
  }

  return errors;
}

module.exports = {
  getErrors,
};

module.exports = { getErrors };
