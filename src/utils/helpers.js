const { supportedCases } = require('./constants');

function parseUrl(req) {
  const splitted = req.url.split('?');
  const originalText = splitted[0].slice(1);
  const targetCase = new URLSearchParams(splitted[1]).get('toCase');

  return { targetCase, originalText };
}

function sendResponse(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

function validate(targetCase, originalText) {
  const errors = [];

  if (!targetCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!originalText.trim()) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (
    targetCase &&
    !supportedCases.some(
      (supportedCase) => supportedCase === targetCase.toUpperCase(),
    )
  ) {
    errors.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }

  return errors;
}

module.exports = {
  parseUrl,
  sendResponse,
  validate,
};
