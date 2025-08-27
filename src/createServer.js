/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = req.url;
    const urlParts = url.split('?');
    const path = urlParts[0];
    const query = urlParts[1];
    const pathString = path.slice(1);
    const queryParams = new URLSearchParams(query);
    const toCase = queryParams.get('toCase');
    const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [
      {
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        status: 400,
      },
      {
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        status: 400,
      },
      {
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        status: 400,
      },
    ];
    const validationErrors = [];

    if (pathString.length === 0) {
      validationErrors.push(errors[0]);
    }

    if (!toCase) {
      validationErrors.push(errors[1]);
    } else if (!allowedCases.includes(toCase)) {
      validationErrors.push(errors[2]);
    }

    if (validationErrors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: validationErrors.map((e) => ({ message: e.message })),
        }),
      );

      return;
    }

    const result = convertToCase(pathString, toCase);

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: pathString,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
};

module.exports = { createServer };
