const {
  errorsMessages,
  validCases,
} = require('./validationData');

function validaton(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message: errorsMessages.textIsMissing,
    });
  }

  if (!toCase) {
    errors.push({
      message: errorsMessages.toCaseIsMissing,
    });
  }

  if (!validCases.includes(toCase) && toCase) {
    errors.push({
      message: errorsMessages.toCaseIsNotSupported,
    });
  }

  return { errors };
}

module.exports = { validaton };
