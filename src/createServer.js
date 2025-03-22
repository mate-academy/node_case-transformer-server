const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateRequest } = require('./validateRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

    const validationErrors = validateRequest(textToConvert, toCase);

    if (validationErrors.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify(validationErrors));
    } else {
      const conversionResult = convertToCase(textToConvert, toCase);
      const responseBody = {
        originalCase: conversionResult.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: conversionResult.convertedText,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(responseBody));
    }
  });

  return server;
}

module.exports = { createServer };
