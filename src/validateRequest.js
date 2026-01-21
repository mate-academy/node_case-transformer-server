const caseOptions = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateRequest(text = '', option) {
  const error = {
    errors: [],
  };

  if (!text) {
    const newError = {
      message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };

    error.errors.push(newError);
  }

  if (option === null) {
    const newError = {
      message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };

    error.errors.push(newError);
  } else if (!caseOptions.includes(option)) {
    const newError = {
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    };

    error.errors.push(newError);
  }

  return error;
}

module.exports = { validateRequest };
