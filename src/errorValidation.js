/* eslint-disable max-len */
function errorValidation(textToConvert, toCase) {
  const errorMessages = {
    errors: [],
  };

  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!textToConvert) {
    errorMessages.errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!toCase) {
    errorMessages.errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (toCase && !availableCases.includes(toCase)) {
    errorMessages.errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errorMessages;
}

module.exports = { errorValidation };
