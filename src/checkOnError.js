/* eslint-disable max-len */
function checkOnError(text, targetCase) {
  const errorMessages = [
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  ];

  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errorObject = {
    errors: [],
  };

  if (!text) {
    errorObject.errors.push({ message: errorMessages[0] });
  }

  if (!targetCase) {
    errorObject.errors.push({ message: errorMessages[1] });
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    errorObject.errors.push({ message: errorMessages[2] });
  }

  return errorObject;
}

module.exports = {
  checkOnError,
};
