const { ERROR_MESSAGES, CASE_TYPES } = require('./constants');

function createErrorMessage(err) {
  return {
    message: err,
  };
}

function validateInputs(textToConvert, toCase) {
  const errorsPayload = {
    errors: [],
  };

  if (!textToConvert) {
    errorsPayload.errors.push(createErrorMessage(ERROR_MESSAGES.textIsMissing));
  }

  if (!toCase) {
    errorsPayload.errors.push(
      createErrorMessage(ERROR_MESSAGES.toCaseIsMissing),
    );
  }

  if (toCase && !CASE_TYPES.includes(toCase)) {
    errorsPayload.errors.push(
      createErrorMessage(ERROR_MESSAGES.toCaseIsInvalid),
    );
  }

  return errorsPayload;
}

module.exports = {
  validateInputs,
};
