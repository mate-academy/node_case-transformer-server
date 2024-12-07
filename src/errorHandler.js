const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const VALIDATION_ERRORS = {
  NO_TEXT:
    'Text to convert is required. Correct request is: ' +
    '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_TARGET_CASE:
    '"toCase" query param is required. Correct request is: ' +
    '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CASE_NOT_SUPPORTED:
    'This case is not supported. Available cases: ' +
    `${availableCases.join(', ')}.`,
};

function errorHandler(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: VALIDATION_ERRORS.NO_TEXT,
    });
  }

  if (!availableCases.includes(targetCase) && targetCase) {
    errors.push({
      message: VALIDATION_ERRORS.CASE_NOT_SUPPORTED,
    });
  }

  if (!targetCase) {
    errors.push({
      message: VALIDATION_ERRORS.NO_TARGET_CASE,
    });
  }

  return errors;
}

module.exports = { errorHandler };
