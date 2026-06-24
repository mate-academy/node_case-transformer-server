// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [path, query] = req.url.split('?');
    const parsedQuery = new URLSearchParams(query || '');

    const originalText = path.slice(1);
    const targetCase = parsedQuery.get('toCase');

    const errors = [];

    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !validCases.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const result = {
      originalText: originalText,
      convertedText: convertedText,
      originalCase: originalCase,
      targetCase: targetCase,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });

  return server;
};

module.exports = { createServer };
