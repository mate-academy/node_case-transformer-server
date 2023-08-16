const { CASES_LIST } = require('../constants/CASES_LIST');
const { ERROR_MESSAGES } = require('../constants/ERROR_MESSAGES');

const getErrorMessages = (originalText, targetCase) => {
  const errorMessages = {
    errors: [],
  };

  if (!originalText) {
    errorMessages.errors.push({
      message: ERROR_MESSAGES.textIsMissing,
    });
  }

  if (!targetCase) {
    errorMessages.errors.push({
      message: ERROR_MESSAGES.toCaseIsMissing,
    });
  }

  if (targetCase && !CASES_LIST.includes(targetCase)) {
    errorMessages.errors.push({
      message: ERROR_MESSAGES.toCaseIsNotSupported,
    });
  }

  return errorMessages;
};

module.exports = { getErrorMessages };
