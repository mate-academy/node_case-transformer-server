/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const parsedUrl = new URL(req.url, 'http://localhost:5700');
    const error = { errors: [] };
    const exampleUrl = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const correctCasses = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const toCase = parsedUrl.searchParams.get('toCase');
    const originalText = parsedUrl.pathname.slice(1);

    if (!toCase) {
      error.errors.push({
        message: `"toCase" query param is required. Correct request is: ${exampleUrl}`,
      });
    }

    if (originalText === '') {
      error.errors.push({
        message: `Text to convert is required. Correct request is: ${exampleUrl}`,
      });
    }

    if (toCase && !correctCasses.includes(toCase)) {
      error.errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (error.errors.length === 0) {
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

    if (error.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(error));
    }
  });

  return server;
}
module.exports = { createServer };
