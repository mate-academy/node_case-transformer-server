const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validateInputData = (originalText, toCase) => {
  const errors = [];
  const isCaseNotSupported = toCase && !SUPPORTED_CASES.includes(toCase);

  const handleError = (message) => {
    const error = { message };

    errors.push(error);
  };

  if (!originalText) {
    const errorMessage =
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    handleError(errorMessage);
  }

  if (isCaseNotSupported) {
    const errorMessage = `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`;

    handleError(errorMessage);
  }

  if (!toCase) {
    const errorMessage =
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    handleError(errorMessage);
  }

  return errors;
};

module.exports = {
  validateInputData,
};
