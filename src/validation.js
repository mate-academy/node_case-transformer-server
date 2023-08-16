const { ERROR_MESSAGES, SUPPORTED_CASES } = require('./constants');

function validateParams(originalText, targetCase) {
  const errors = [];

  if (originalText.length === 0) {
    errors.push({
      message: ERROR_MESSAGES.noTextToConvert,
    });
  }

  if (!targetCase) {
    errors.push({
      message: ERROR_MESSAGES.noCaseParam,
    });
  } else if (!SUPPORTED_CASES.includes(targetCase)) {
    errors.push({
      message: ERROR_MESSAGES.notSupportedCase,
    });
  }

  return errors;
}

module.exports = { validateParams };
