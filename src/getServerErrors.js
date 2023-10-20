const {
  ERROR_MESSAGE_NO_TEXT,
  ERROR_MESSAGE_NO_CASE,
  ERROR_MESSAGE_INVALID_CASE,
  AVAILABLE_CASES,
} = require('./constants/constants');

function getServerErrors(originalText, targetCase) {
  const errorsParams = {
    errors: [],
  };

  if (!originalText) {
    errorsParams.errors.push({ message: ERROR_MESSAGE_NO_TEXT });
  };

  if (!targetCase) {
    errorsParams.errors.push({ message: ERROR_MESSAGE_NO_CASE });
  };

  if (targetCase && !AVAILABLE_CASES.includes(targetCase)) {
    errorsParams.errors.push({ message: ERROR_MESSAGE_INVALID_CASE });
  };

  return errorsParams;
}

module.exports = {
  getServerErrors,
};
