'use strict';

function validation(text, param) {
  const errors = [];
  let errorMessage = '';
  const typeParam = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text) {
    errorMessage = 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    errors.push(errorMessage);
  }

  if (!param) {
    errorMessage = '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    errors.push(errorMessage);
  }

  if (param && !typeParam.includes(param)) {
    errorMessage = 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
    errors.push(errorMessage);
  }

  return errors;
}

module.exports = validation;
