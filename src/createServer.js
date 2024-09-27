/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateError } = require('./validateError');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const parsedUrl = new URL(req.url, 'http://localhost:5700');
    const toCase = parsedUrl.searchParams.get('toCase');
    const originalText = parsedUrl.pathname.slice(1);
    const validateErrorMessage = validateError(originalText, toCase);

    if (validateErrorMessage.errors.length === 0) {
      const convertedCase = convertToCase(parsedUrl.pathname.slice(1), toCase);
      const convertedText = convertedCase.convertedText;
      const result = {
        originalCase: convertedCase.originalCase,
        targetCase: toCase,
        originalText,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'Ok';
      res.end(JSON.stringify(result));
    }

    if (validateErrorMessage.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(validateErrorMessage));
    }
  });

  return server;
}
module.exports = { createServer };
