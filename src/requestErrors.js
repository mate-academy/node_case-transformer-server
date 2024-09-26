/* eslint-disable max-len */
'use strict';

const caseVal = 'SNAKE KEBAB CAMEL PASCAL UPPER';

const requestErrors = (text, reqCase) => {
  const errors = [];

  if (!text) {
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!reqCase) {
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (reqCase && !caseVal.includes(reqCase)) {
    errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errors;
};

module.exports = {
  requestErrors,
};
