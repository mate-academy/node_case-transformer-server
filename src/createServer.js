const { createServer: _createServer } = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = _createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const fullUrl = new URL(req.url, `http://${req.headers.host}`);

    const pathname = fullUrl.pathname;
    const toCase = fullUrl.searchParams.get('toCase');

    const errors = [];

    // Extract text to convert (strip leading "/")
    const textToConvert =
      pathname && pathname !== '/' ? decodeURIComponent(pathname.slice(1)) : '';

    // Validation
    if (!textToConvert) {
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

    // Conversion
    try {
      const result = convertToCase(toCase, textToConvert);

      const responsePayload = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(responsePayload));
    } catch (err) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';

      res.end(
        JSON.stringify({
          errors: [{ message: 'Internal server error' }],
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer };
