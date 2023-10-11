const { caseNames, ERROR_MESSAGES } = require('./constants');

const checkValidation = (textToTransform, toCase) => {
  const errors = [];

  if (!textToTransform) {
    errors.push({ message: ERROR_MESSAGES.NO_ORIGIN_STRING });
  }

  if (!toCase) {
    errors.push({ message: ERROR_MESSAGES.NO_QUERY_CASE });
  }

  if (toCase && !(caseNames.includes(toCase))) {
    errors.push({ message: ERROR_MESSAGES.NO_SUPPORTED_CASE });
  }

  return errors;
};

module.exports = {
  checkValidation,
};
