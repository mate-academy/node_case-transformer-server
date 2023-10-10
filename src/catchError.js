const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERRORS = {
  NO_TEXT: 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE: '"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALID_CASE: 'This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function catchError(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({ message: ERRORS.NO_TEXT });
  }

  if (!targetCase) {
    errors.push({ message: ERRORS.NO_CASE });
  } else if (!allowedCases.includes(targetCase)) {
    errors.push({ message: ERRORS.INVALID_CASE });
  }

  return errors;
}

module.exports = { catchError };
