/* eslint-disable max-len */
function errorCheck(text, targetCase) {
  const errors = [];

  const caseOptions = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errorMessageOptions = {
    missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    missingQueryParam: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    unsupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };

  if (!text) {
    errors.push({ message: errorMessageOptions.missingText });
  }

  if (!targetCase) {
    errors.push({ message: errorMessageOptions.missingQueryParam });
  }

  if (targetCase && !caseOptions.includes(targetCase)) {
    errors.push({ message: errorMessageOptions.unsupportedCase });
  }

  return { errors };
}

module.exports = { errorCheck };
