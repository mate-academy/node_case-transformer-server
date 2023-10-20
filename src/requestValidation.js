/* eslint-disable max-len */
const { supportedCases, correctRequestText, availableCases } = require('./constants');

function validateRequest(convertedText, targetCase) {
  const errors = [];

  if (!convertedText) {
    errors.push({ message: `Text to convert is required. ${correctRequestText}` });
  }

  if (!targetCase) {
    errors.push({ message: `"toCase" query param is required. ${correctRequestText}` });
  } else {
    if (!supportedCases.includes(targetCase.toUpperCase())) {
      errors.push({ message: `This case is not supported. ${availableCases}` });
    }
  }

  return errors;
}

module.exports = { validateRequest };
