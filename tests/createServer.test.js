'use strict';
/* eslint-disable max-len */

const http = require('http');
const { convertToCase } = require('../src/convertToCase');

const createServer = () => {
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(
      req.url, `http://localhost${req.headers.host}`,
    );

    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const textIsMissing = !originalText;
    const caseIsMissing = !targetCase;
    const caseNameIsNotSupported = !availableCases.includes(targetCase);

    const hasError = textIsMissing
      || caseIsMissing
      || caseNameIsNotSupported;

    if (hasError) {
      const errorMessages = {
        errors: [],
      };

      if (textIsMissing) {
        errorMessages.errors.push({
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (caseIsMissing) {
        errorMessages.errors.push({
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (caseNameIsNotSupported) {
        errorMessages.errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errorMessages));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    const data = {
      originalCase,
      convertedText,
      targetCase,
      originalText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(data));
  });

  return server;
};

module.exports = { createServer };
