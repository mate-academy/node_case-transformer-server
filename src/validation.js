/* eslint-disable no-multi-str */
const TEXT_REQUIRED_MESSAGE = 'Text to convert is required. \
Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const PARAM_REQUIRED_MESSAGE = '"toCase" query param is required. \
Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const WRONG_PARAM_MESSAGE = 'This case is not supported. \
Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const paramValues = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validate(textToConvert, toCase) {
  const payload = {
    errors: [],
  };

  if (textToConvert.length === 0) {
    payload.errors.push({
      message: TEXT_REQUIRED_MESSAGE,
    });
  }

  if (!toCase) {
    payload.errors.push({
      message: PARAM_REQUIRED_MESSAGE,
    });
  }

  if (toCase && !paramValues.includes(toCase)) {
    payload.errors.push({
      message: WRONG_PARAM_MESSAGE,
    });
  }

  return payload;
}

module.exports = { validate };
