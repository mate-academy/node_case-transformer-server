function processRequest(req) {
  const [pathname, queryString] = req.url.split('?');
  const params = new URLSearchParams(queryString);
  const targetCase = params.get('toCase');
  const textToConvert = pathname.slice(1);

  const errors = [];

  if (!textToConvert) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase
    && !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)) {
    errors.push({
      message:
        'This case is not supported. Available cases: '
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return {
    textToConvert,
    targetCase,
    errors,
  };
}

function sendSuccessResponse(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function sendErrorResponse(res, errors) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ errors }));
}

function createResponse(result, targetCase, textToConvert) {
  return {
    originalCase: result.originalCase,
    targetCase,
    originalText: textToConvert,
    convertedText: result.convertedText,
  };
}

module.exports = {
  processRequest,
  sendErrorResponse,
  sendSuccessResponse,
  createResponse,
};
