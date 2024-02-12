const { errorsMessages, toCaseValues } = require('./constants');

function getRequestErrors(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: errorsMessages.NO_TEXT_TO_CONVERT,
    });
  }

  if (!toCase) {
    errors.push({
      message: errorsMessages.NO_TO_CASE,
    });
  }

  if (toCase && !Object.values(toCaseValues).includes(toCase)) {
    errors.push({
      message: errorsMessages.INVALID_CASE,
    });
  }

  return errors;
}

module.exports = {
  getRequestErrors,
};
