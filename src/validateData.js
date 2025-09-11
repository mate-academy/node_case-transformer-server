/* eslint-disable max-len */

const { createErrorMessage } = require('./createErrorMessage');

const TEXT_MISSING =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_MISSING =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_UNKNOWN =
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const POSSIBLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateData(textForTransform, toCase) {
  const errors = [];

  if (!textForTransform) {
    errors.push(createErrorMessage(TEXT_MISSING));
  }

  if (!toCase) {
    errors.push(createErrorMessage(TO_CASE_MISSING));
  }

  if (toCase && !POSSIBLE_CASES.includes(toCase)) {
    errors.push(createErrorMessage(TO_CASE_UNKNOWN));
  }

  return errors;
}

module.exports = {
  validateData,
};
