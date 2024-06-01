/* eslint-disable max-len */
function getErrors(text, toCase) {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  const messages = {
    noText:
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    noCase:
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    caseNotSupported:
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };

  if (!text) {
    errors.push({ message: messages.noText });
  }

  if (!toCase) {
    errors.push({ message: messages.noCase });
  } else if (!supportedCases.includes(toCase)) {
    errors.push({ message: messages.caseNotSupported });
  }

  return errors;
}

module.exports = {
  getErrors,
};
