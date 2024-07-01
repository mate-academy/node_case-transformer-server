function sendJsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function respondWithError(res, errors) {
  sendJsonResponse(res, 400, { errors });
}

function validateRequest(text, toCase, supportedCases) {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!supportedCases.includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = {
  sendJsonResponse,
  respondWithError,
  validateRequest,
};
