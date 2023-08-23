/* eslint-disable max-len */

import http from 'http';

const { convertToCase } = require('./convertToCase/convertToCase.js');
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const noText = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const noCase = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const unavailableCase = `This case is not supported. Available cases: ${supportedCases.join(', ')}.`;

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedURL.pathname.slice(1) || false;
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: noText });
    }

    if (!toCase) {
      errors.push({ message: noCase });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({ message: unavailableCase });
    }

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(textToConvert, toCase);

      const body = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;

      res.end(JSON.stringify(body));
    }
  });

  return server;
}

module.exports = { createServer };
