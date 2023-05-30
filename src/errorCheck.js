const { errorMessages } = require('./constants/errorsMessages');
const { availableCases } = require('./constants/availableCases');

function errorCheck(text, targetCase) {
  const errors = [];

  if (!text) {
    errors.push(errorMessages[0]);
  }

  if (!targetCase) {
    errors.push(errorMessages[1]);
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    errors.push(errorMessages[2]);
  }

  return errors;
}

module.exports = { errorCheck };
