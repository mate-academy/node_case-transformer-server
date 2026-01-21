const { ERROR_MSGS, SUPPORTED_CASES } = require('./constants');

function validation(originalText, targetCase) {
  const errorsList = {
    errors: [],
  };

  if (!originalText) {
    errorsList.errors.push({
      message: ERROR_MSGS.noText,
    });
  }

  if (!targetCase) {
    errorsList.errors.push({
      message: ERROR_MSGS.noToCase,
    });
  }

  if (targetCase && !SUPPORTED_CASES.includes(targetCase.toUpperCase())) {
    errorsList.errors.push({
      message: ERROR_MSGS.wrongToCase,
    });
  }

  return errorsList;
}

module.exports = {
  validation,
};
