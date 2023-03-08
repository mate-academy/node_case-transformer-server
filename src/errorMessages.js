/* eslint-disable max-len */
const missingText = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const caseMissing = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const wrongCaseValue = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function handleError(textConvert, toCase) {
  const errors = [];

  if (!textConvert) {
    errors.push({ message: missingText });
  }

  if (!toCase) {
    errors.push({ message: caseMissing });
  }

  if (!availableCases.includes(toCase) && toCase) {
    errors.push({ message: wrongCaseValue });
  };

  return { errors };
};

module.exports = { handleError };
