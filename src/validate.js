'use strict';

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validate(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message: 'Text to convert is required. '.concat(
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required. '.concat(
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    });
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push({
      message: 'This case is not supported. '.concat(
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      ),
    });
  }

  return errors;
}

module.exports = { validate };
