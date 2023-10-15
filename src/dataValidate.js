const { errorMessages } = require('./errorMessages');
const { CASE_OPTIONS } = require('./constants/constants');

function dataValidate(originalText, targetCase) {
  const errors = [];

  if (!targetCase) {
    errors.push({ message: errorMessages.NO_CASE });
  }

  if (!originalText) {
    errors.push({ message: errorMessages.NO_TEXT });
  }

  if (targetCase && !CASE_OPTIONS.includes(targetCase)) {
    errors.push({ message: errorMessages.NOT_VALID_CASE });
  }

  return errors;
}

module.exports = { dataValidate };
