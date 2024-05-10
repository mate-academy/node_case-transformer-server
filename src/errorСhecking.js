const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/* eslint-disable max-len */
const TEXT_IS_REQUIRED_MESSAGE =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_IS_REQUIRED_MESSAGE =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const AVAILABLE_CASES_MESSAGE = `This case is not supported. Available cases: ${supportedCases.join(', ')}.`;

function errorChecking(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: TEXT_IS_REQUIRED_MESSAGE,
    });
  }

  if (!targetCase) {
    errors.push({
      message: TO_CASE_IS_REQUIRED_MESSAGE,
    });
  }

  if (targetCase && !supportedCases.includes(targetCase)) {
    errors.push({
      message: AVAILABLE_CASES_MESSAGE,
    });
  }

  return errors;
}

module.exports = {
  errorChecking,
};
