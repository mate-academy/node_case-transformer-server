function sendResponse(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;

  res.end(JSON.stringify(data));
};

function paramValidator(textToConvert, toCase) {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message:
        'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push({
      message:
        'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length) {
    const error = new Error('Validation erorrs');

    error.errors = errors;

    throw error;
  }

  return { textToConvert, toCase };
}

module.exports = {
  paramValidator,
  sendResponse,
};
