const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');
    const errors = [];

    if (!text) {
      errors.push('Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
    }

    if (!toCase) {
      errors.push('"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
    }

    if (toCase && !supportedCases.includes(toCase.toUpperCase())) {
      errors.push('This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
    }

    if (errors.length) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      const errorMessages = errors.map((error) => ({ message: error }));

      res.end(JSON.stringify({
        errors: errorMessages,
      }));
    } else {
      const { originalCase, convertedText } = convertToCase(text, toCase);
      const response = JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      });

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(response);
    }
  });

  return server;
};

module.exports = {
  createServer,
};
