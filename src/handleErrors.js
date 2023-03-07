const {
  errorsMessages,
  supportedCases,
} = require('./additionalInfoToHandleErrors');

function handleErrors(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: errorsMessages.textIsEmpty,
    });
  }

  if (!toCase) {
    errors.push({
      message: errorsMessages.caseIsEmpty,
    });
  }

  if (!(supportedCases.includes(toCase)) && toCase) {
    errors.push({
      message: errorsMessages.caseNotSupported,
    });
  }

  return { errors };
}

module.exports = {
  handleErrors,
};
