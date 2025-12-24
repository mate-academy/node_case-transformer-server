/* eslint-disable max-len */
function checkOnError(text, targetCase) {
  const errorMessages = {
    Text: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    TargetCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    NotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };

  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errorObject = {
    errors: [],
  };

  if (!text) {
    errorObject.errors.push({ message: errorMessages.Text });
  }

  if (!targetCase) {
    errorObject.errors.push({ message: errorMessages.TargetCase });
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    errorObject.errors.push({ message: errorMessages.NotSupported });
  }

  return errorObject;
}

module.exports = {
  checkOnError,
};
