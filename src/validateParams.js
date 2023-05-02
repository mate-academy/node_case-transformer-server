const { availiableCases } = require('./constants');

function validateParams(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push('Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (!targetCase) {
    errors.push('"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  } else if (!availiableCases.includes(targetCase)) {
    errors.push('This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
  }

  return errors;
}

module.exports = {
  validateParams,
};
