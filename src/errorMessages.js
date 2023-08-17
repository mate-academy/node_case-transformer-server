/* eslint-disable max-len */
'use strict';

const errorMessages = {
  wrongCaseType: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  textIsRequired: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseIsRequired: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

module.exports = {
  errorMessages,
};
