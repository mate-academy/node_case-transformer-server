/* eslint-disable max-len */
const CORRECT_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERRORS = {
  MESSAGE_NO_TEXT: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  MESSAGE_NO_CASE: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  MESSAGE_INVALID_CASE: `This case is not supported. Available cases: ${CORRECT_CASES.join(', ')}.`,
};

function processErrors(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({ message: ERRORS.MESSAGE_NO_TEXT });
  }

  if (!targetCase) {
    errors.push({ message: ERRORS.MESSAGE_NO_CASE });
  }

  if (targetCase && !CORRECT_CASES.includes(targetCase)) {
    errors.push({ message: ERRORS.MESSAGE_INVALID_CASE });
  }

  return errors;
}

module.exports = { processErrors };
