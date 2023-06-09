/* eslint-disable max-len */

function isValidReq(text, searchProperty, searchParam) {
  let error = false;
  let message = '';
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text) {
    error = true;
    message = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  }

  if (searchProperty !== 'toCase') {
    error = true;
    message = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  }

  if (!cases.includes(searchParam)) {
    error = true;
    message = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
  }

  return {
    error,
    message,
  };
}

module.exports = {
  isValidReq,
};
