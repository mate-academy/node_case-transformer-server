const { missingText, missingTargetCase } = require('./errorMessages');

function getErrors(text, targetCase) {
  const responseErrors = {
    errors: [],
  };

  if (!text) {
    responseErrors.errors.push({ message: missingText });
  }

  if (!targetCase) {
    responseErrors.errors.push({ message: missingTargetCase });
  }

  return responseErrors;
}

module.exports = { getErrors };
