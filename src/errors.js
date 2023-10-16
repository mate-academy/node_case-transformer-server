const {
  ERROR_MESSAGE_INVALID_CASE,
  ERROR_MESSAGE_NO_CASE,
  ERROR_MESSAGE_NO_TEXT,
  availableCases,
} = require('./utils/constants');

function getError(originalText, targetCase) {
  const errors = {
    errors: [],
  };

  if (!originalText) {
    errors.errors.push({
      message: ERROR_MESSAGE_NO_TEXT,
    });
  }

  if (!targetCase) {
    errors.errors.push({
      message: ERROR_MESSAGE_NO_CASE,
    });
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    errors.errors.push({
      message: ERROR_MESSAGE_INVALID_CASE,
    });
  }

  return errors;
}

module.exports = { getError };
