const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validate');
const { sendError, sendSuccess } = require('./response');

const createServer = () => {
  return http.createServer((req, res) => {
    const baseUrl = 'http://' + req.headers.host;
    const normalizedURL = new URL(req.url, baseUrl);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = validate(originalText, targetCase);

    if (errors.length > 0) {
      sendError(res, errors);

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const responseBody = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    sendSuccess(res, responseBody);
  });
};

module.exports = { createServer };
