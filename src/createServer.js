const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const caseName = normalizedURL.searchParams.get('toCase');
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!caseName || !originalText || !availableCases.includes(caseName)) {
      const errors = [];

      res.writeHead(400, { 'Content-Type': 'application/json' });

      if (!caseName) {
        errors.push({
          message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      if (!originalText) {
        errors.push({
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      if (!availableCases.includes(caseName)) {
        errors.push({
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        });
      }

      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        caseName,
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase,
          targetCase: caseName,
          originalText,
          convertedText,
        }),
      );
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
}

module.exports = { createServer };
