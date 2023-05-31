/* eslint-disable max-len */
function errorValidation(textToConvert, toCase) {
  const errorMessages = {
    missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    missingTargetCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    wrongTargetCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };

  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const responceErrors = {
    errors: [],
  };

  if (!textToConvert) {
    responceErrors.errors.push({ message: errorMessages.missingText });
  }

  if (!toCase) {
    responceErrors.errors.push({ message: errorMessages.missingTargetCase });
  }

  if (toCase && !availableCases.includes(toCase)) {
    responceErrors.errors.push({ message: errorMessages.wrongTargetCase });
  }

  return responceErrors;
}

module.exports = { errorValidation };
