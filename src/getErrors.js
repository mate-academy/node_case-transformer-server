/* eslint-disable max-len */
const emptyTextError = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const emptyCaseError = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const NotSupportedCaseError = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const types = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

const getErrors = (text, type) => {
  const errors = [];

  if (!text) {
    errors.push({ message: emptyTextError });
  }

  if (!type) {
    errors.push({ message: emptyCaseError });
  }

  if (type && !types.includes(type)) {
    errors.push({ message: NotSupportedCaseError });
  }

  return errors;
};

module.exports = {
  getErrors,
};
