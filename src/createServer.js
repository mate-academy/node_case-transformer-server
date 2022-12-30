/* eslint-disable max-len */

const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [pathName, queryParams] = req.url.split('?');
    const text = pathName.slice(1);
    const params = new URLSearchParams(queryParams);
    const toCase = params.get('toCase');

    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errorMessages = [
      { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      { message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
    ];

    const errors = [];

    if (!text) {
      errors.push(errorMessages[0]);
    }

    if (!toCase) {
      errors.push(errorMessages[1]);
    }

    if (!validCases.includes(toCase) && toCase) {
      errors.push(errorMessages[2]);
    }

    if (errors.length > 0) {
      const errorResponse = JSON.stringify({
        errors,
      });

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(errorResponse);

      return;
    }

    const result = convertToCase(text, toCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const formattedResponse = JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    });

    res.end(formattedResponse);
  });

  return server;
};

module.exports = {
  createServer,
};
