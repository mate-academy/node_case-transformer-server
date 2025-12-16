const { errorMessages } = require('./constants/errorsMessages');
const { availableCases } = require('./constants/availableCases');

function errorCheck(text, targetCase) {
  const errorsObject = {
    errors: [],
  };

  if (!text) {
    errorsObject.errors.push({ message: errorMessages.missingText });
  }

  if (!targetCase) {
    errorsObject.errors.push({ message: errorMessages.missingQueryParam });
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    errorsObject.errors.push({ message: errorMessages.unsupportedCase });
  }

  return errorsObject;
}

module.exports = { errorCheck };
