/* eslint-disable max-len */
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const TEXT_REQUIRED = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const CASE_REQUIRED = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const INVALID_CASE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function checkErrors(text, targetCase) {
  const errors = [];

  if (!text) {
    errors.push(TEXT_REQUIRED);
  }

  if (!targetCase) {
    errors.push(CASE_REQUIRED);
  } else if (!CASES.includes(targetCase.toUpperCase())) {
    errors.push(INVALID_CASE);
  }

  return errors.length ? errors : null;
}

module.exports = { checkErrors };
