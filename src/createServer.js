/* eslint-disable max-len */
'use strict';

const createServer = () => {
  const http = require('http');
  const { convertToCase } = require('./convertToCase');

  const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const textIsMissing = !originalText;
    const toCaseIsMissing = !targetCase;
    const caseNameIsMissing = !(caseName.includes(targetCase));

    if (textIsMissing || toCaseIsMissing || caseNameIsMissing) {
      const { errorMessages } = require('./errorMessages');
      const errors = [];

      if (textIsMissing) {
        errors.push({ message: errorMessages.missingText });
      }

      if (toCaseIsMissing) {
        errors.push({ message: errorMessages.missingToCase });
      }

      if (!toCaseIsMissing && caseNameIsMissing) {
        errors.push({ message: errorMessages.missingCaseName });
      }

      res.statusCode = 404;
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({ errors }),
      );

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });
};

module.exports = { createServer };
