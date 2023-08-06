/* eslint-disable max-len */
const availableCases = ['SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'];

function isError(originalText, targetCase) {
  const textIsMissing = !originalText;
  const caseIsMissing = !targetCase;
  const caseIsNotSupported = !availableCases.includes(targetCase);

  const hasError = textIsMissing || caseIsMissing || caseIsNotSupported;

  if (hasError) {
    const errorMessages = {
      errors: [],
    };

    if (textIsMissing) {
      errorMessages.errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseIsMissing) {
      errorMessages.errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseIsNotSupported) {
      errorMessages.errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    return errorMessages;
  };
};

module.exports = { isError };
