'use strict';

function validateRequest(text, method) {
  const errors = [];
  const toCaseValues = [
    'SNAKE',
    'KEBAB',
    'CAMEL',
    'PASCAL',
    'UPPER',
  ];

  if (!text) {
    errors.push({
      message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!method) {
    errors.push({
      message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (method && !toCaseValues.includes(method)) {
    errors.push({
      message: 'This case is not supported. '
        + `Available cases: ${toCaseValues.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = validateRequest;
