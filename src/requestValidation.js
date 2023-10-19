/* eslint-disable max-len */
const { supportedCases } = require('./constants');

function validateRequest(convertedText, targetCase) {
  const errors = [];
  const correctRequestText = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const availableCases = `Available cases: ${supportedCases.join(', ')}.`;

  if (!convertedText) {
    errors.push({ message: `Text to convert is required. ${correctRequestText}` });
  }

  if (!targetCase) {
    errors.push({ message: `"toCase" query param is required. ${correctRequestText}` });
  } else {
    const upperCaseTargetCase = targetCase.toUpperCase();

    if (!supportedCases.includes(upperCaseTargetCase)) {
      errors.push({ message: `This case is not supported. ${availableCases}` });
    }
  }

  return errors;
}

module.exports = { validateRequest };
