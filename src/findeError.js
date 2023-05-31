const { convertToCase } = require('./convertToCase');
const { errorMessages } = require('./errorMessages');

function findError(response) {
  const { originalText, targetCase } = response;

  const responseError = {
    errors: [],
  };

  if (!originalText) {
    responseError.errors.push({ message: errorMessages.textError });
  }

  if (!targetCase) {
    responseError.errors.push({ message: errorMessages.caseError });
  }

  try {
    Object.assign(response, convertToCase(originalText, targetCase));
  } catch {
    if (targetCase) {
      responseError.errors.push({ message: errorMessages.caseInvalid });
    }
  }

  return responseError;
}

module.exports = {
  findError,
};
