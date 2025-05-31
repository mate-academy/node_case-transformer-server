/* eslint-disable max-len */
const validateRequest = (text, caseName) => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];
  const createErrorMessage = (message) => ({ message });

  if (!text) {
    errors.push(
      createErrorMessage(
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    );
  }

  if (!caseName) {
    errors.push(
      createErrorMessage(
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    );
  } else {
    if (!supportedCases.includes(caseName)) {
      errors.push(
        createErrorMessage(
          `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
        ),
      );
    }
  }

  return errors;
};

module.exports.validateRequest = validateRequest;
