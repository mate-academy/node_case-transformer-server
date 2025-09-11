/* eslint-disable max-len */

const { createErrorMessage } = require('./createErrorMessage');
const { convertToCase } = require('./convertToCase');

const TEXT_MISSING =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_MISSING =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_UNKNOWN =
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function getResult(textForTransform, toCase) {
  const errors = [];
  const resultOfTransform = {};

  if (!textForTransform) {
    errors.push(createErrorMessage(TEXT_MISSING));
  }

  if (!toCase) {
    errors.push(createErrorMessage(TO_CASE_MISSING));
  } else {
    try {
      const convertedData = convertToCase(textForTransform, toCase);

      resultOfTransform.originalCase = convertedData.originalCase;
      resultOfTransform.targetCase = toCase;
      resultOfTransform.originalText = textForTransform;
      resultOfTransform.convertedText = convertedData.convertedText;
    } catch (err) {
      errors.push(createErrorMessage(TO_CASE_UNKNOWN));
    }
  }

  return { errors, resultOfTransform };
}

module.exports = {
  getResult,
};
