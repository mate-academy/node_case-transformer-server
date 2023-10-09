/* eslint-disable max-len */
const ERRORS = {
  INVALID_CASE: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  NO_TEXT: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const allowedCases = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

function getErrors(reqText, reqCase) {
  const errors = [];

  if (!reqText) {
    errors.push({ message: ERRORS.NO_TEXT });
  }

  if (!reqCase) {
    errors.push({ message: ERRORS.NO_CASE });
  }

  if (reqCase && !allowedCases.includes(reqCase)) {
    errors.push({ message: ERRORS.INVALID_CASE });
  }

  return errors;
}

module.exports = {
  getErrors,
};
