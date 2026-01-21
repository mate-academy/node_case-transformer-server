const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateCaseAndText } = require('./validateCaseAndText');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = new URLSearchParams(normalizedUrl.search);
    const targetCase = searchParams.get('toCase');
    const originalText = normalizedUrl.pathname.slice(1);
    const errorMessages = validateCaseAndText(targetCase, originalText);

    if (errorMessages.length > 0) {
      const errorData = {
        errors: errorMessages.map((message) => ({ message })),
      };

      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify(errorData));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const data = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(data));
  });

  return server;
};

module.exports = { createServer };
