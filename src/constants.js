/* eslint-disable max-len */
const TO_CASE = 'toCase';

const toCaseValues = {
  SNAKE: 'SNAKE',
  KEBAB: 'KEBAB',
  CAMEL: 'CAMEL',
  PASCAL: 'PASCAL',
  UPPER: 'UPPER',
};

const errorsMessages = {
  NO_TEXT_TO_CONVERT: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_TO_CASE: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALID_CASE: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  TO_CASE,
  toCaseValues,
  errorsMessages,
};
