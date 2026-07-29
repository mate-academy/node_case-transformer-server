// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = parsedUrl.pathname.slice(1);
    const toCase = parsedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!text) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported.' +
          ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;

      res.end(
        JSON.stringify({
          errors,
        }),
      );

      return;
    }

    try {
      const converted = convertToCase(text, toCase);

      const response = {
        originalCase: converted.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: converted.convertedText,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(response));
    } catch (error) {
      res.statusCode = 400;

      res.end(
        JSON.stringify({
          errors: [{ message: error.message }],
        }),
      );
    }
  });
}

module.exports = { createServer };
