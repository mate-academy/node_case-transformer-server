const { createServer: createHttpServer } = require('http');
const { URL: URLConstructor } = require('url');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return createHttpServer((req, res) => {
    // Set Content-Type header for all responses
    res.setHeader('Content-Type', 'application/json');

    // Parse the URL
    const parsedUrl = new URLConstructor(req.url, 'http://localhost');
    const pathname = parsedUrl.pathname;
    const searchParams = parsedUrl.searchParams;

    // Extract text from pathname (remove leading /)
    const text = pathname.slice(1);

    // Extract toCase from query params
    const toCase = searchParams.get('toCase');

    // Validate
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    // If there are validation errors, respond with 400
    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    // Call business logic
    const result = convertToCase(text, toCase);

    // Respond with success
    res.writeHead(200, 'OK');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
