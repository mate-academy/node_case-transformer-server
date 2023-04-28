/* eslint-disable max-len */

const noTextError = {
  message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const noToCaseError = {
  message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const invalidToCaseError = {
  message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports.noTextError = noTextError;
module.exports.noToCaseError = noToCaseError;
module.exports.invalidToCaseError = invalidToCaseError;
