const http = require('http');
const errorConstants = require('./constants/errorConstants');
const { validateCase, convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = requestUrl.pathname.slice(1);
    const targetCase = requestUrl.searchParams.get('toCase');
    const errors = [];

    if (!originalText) {
      errors.push(errorConstants.noText);
    }

    if (!targetCase) {
      errors.push(errorConstants.noCase);
    } else if (!validateCase(targetCase)) {
      errors.push(errorConstants.invalidCase);
    }

    if (errors.length) {
      res.statusCode = 400;

      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      res.statusCode = 200;

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText,
          convertedText,
        }),
      );
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });
}

module.exports = { createServer };
