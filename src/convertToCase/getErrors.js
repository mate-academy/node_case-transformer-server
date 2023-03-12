'use strict';

const errorCases = {
  convert: 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  query: '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  case: 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const getErrors = (currText, toCase) => {
  const payload = [];
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!currText) {
    payload.push({ message: errorCases.convert });
  }

  if (!toCase) {
    payload.push({ message: errorCases.query });
  }

  if (toCase && !cases.includes(toCase)) {
    payload.push({ message: errorCases.case });
  }

  return payload;
};

module.exports = { getErrors };
