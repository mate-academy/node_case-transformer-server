/* eslint-disable */

function isError(q, c) {
  const errorObj = {
    errors: [],
  };

  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  if (!q) {
    errorObj.errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }
  if (!c) {
    errorObj.errors.push({
      message:
        'toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
    });
  } else if (!cases.includes(c)) {
    errorObj.errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errorObj;
}

module.exports = { isError };
