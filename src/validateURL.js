/* eslint-disable max-len */

function validateURL(textToConvert, toCase) {
  const caseOptions = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const requestErrors = {
    errors: [],
  };

  if (!textToConvert) {
    const errorMessage = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    requestErrors.errors.push({
      message: errorMessage,
    });
  }

  if (!toCase) {
    const errorMessage = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    requestErrors.errors.push({
      message: errorMessage,
    });
  }

  if (toCase && !caseOptions.includes(toCase)) {
    const errorMessage = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    requestErrors.errors.push({
      message: errorMessage,
    });
  }

  return requestErrors;
}

module.exports = {
  validateURL,
};
