const { createServer: createHttpServer } = require('node:http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return createHttpServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    // Parse URL and query
    let urlObj;

    try {
      urlObj = new URL(req.url, 'http://localhost');
    } catch {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                'Text to convert is required. Correct request is: ' +
                '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
            {
              message:
                '"toCase" query param is required. Correct request is: ' +
                '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }),
      );

      return;
    }

    // Extract text and toCase
    let text = urlObj.pathname;

    if (text.startsWith('/')) {
      text = text.slice(1);
    }
    text = decodeURIComponent(text);

    const toCase = urlObj.searchParams.get('toCase');

    // Validation
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

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    // Business logic
    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }),
    );
  });
}

module.exports = { createServer };
