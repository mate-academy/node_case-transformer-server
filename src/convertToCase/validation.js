const { ERROR_MESSAGES, SUPPORTED_CASES } = require('./constants');

const validateRequest = (errors, textToConvert, toCase) => {
  if (!textToConvert) {
    errors.push({
      message: ERROR_MESSAGES.text_absent,
    });
  }

  if (!toCase) {
    errors.push({
      message: ERROR_MESSAGES.case_absent,
    });
  }

  if (toCase && !SUPPORTED_CASES.includes(toCase)) {
    errors.push({
      message: ERROR_MESSAGES.unsupported_case,
    });
  }
};

module.exports = {
  validateRequest,
};
