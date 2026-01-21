const { SUPPORTED_CASES } = require('./config');
const { ERROR_MESSAGES } = require('./errorMessages');

const inputValidation = (originalText, toCase, res) => {
  const isMissingText = !originalText;
  const isMissingCase = !toCase;
  const isUnsupportedCase = !SUPPORTED_CASES.includes(toCase) && !isMissingCase;

  if (isMissingText || isMissingCase || isUnsupportedCase) {
    const body = {
      errors: [],
    };

    if (isMissingText) {
      body.errors.push({
        message: ERROR_MESSAGES.MISSING_TEXT,
      });
    }

    if (isMissingCase) {
      body.errors.push({
        message: ERROR_MESSAGES.MISSING_CASE,
      });
    }

    if (isUnsupportedCase) {
      body.errors.push({
        message: ERROR_MESSAGES.UNSUPPORTED_CASE,
      });
    }

    return {
      isValid: false,
      errorBody: body,
    };
  }

  return {
    isValid: true,
    errorBody: {},
  };
};

module.exports = { inputValidation };
