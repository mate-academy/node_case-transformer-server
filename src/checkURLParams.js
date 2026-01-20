/* eslint-disable max-len */
function checkURLParams(text, targetCase) {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errors = [];

  if (!text) {
    errors.push(
      `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    );
  }

  if (!targetCase) {
    errors.push(
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  if (!supportedCases.includes(targetCase) && targetCase) {
    errors.push(
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    );
  }

  return errors;
}

module.exports = {
  checkURLParams,
};
