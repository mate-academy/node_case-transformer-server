const { convertToCase } = require('../convertToCase/convertToCase');
const { supportedCases, statusCodes, errorMessages } = require('./constants');

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

function sendTransformedResponse(res, targetCase, originalText) {
  const { originalCase, convertedText } = convertToCase(
    originalText,
    targetCase,
  );

  sendResponse(res, statusCodes.OK, {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  });
}

function validate(targetCase, originalText) {
  const errors = [];
  const { caseRequired, textRequired, inValidCase } = errorMessages;

  if (!targetCase) {
    errors.push({ message: caseRequired });
  }

  if (!originalText.trim()) {
    errors.push({ message: textRequired });
  }

  if (
    targetCase &&
    !supportedCases.some(
      (supportedCase) => supportedCase === targetCase.toUpperCase(),
    )
  ) {
    errors.push({ message: inValidCase });
  }

  return errors;
}

module.exports = {
  parseUrl,
  validate,
  sendResponse,
  sendTransformedResponse,
};
