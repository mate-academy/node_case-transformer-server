/* eslint-disable max-len */
'use strict';
/* eslint-disable no-console */
/* eslint-disable dot-notation */

const http = require('http');
const { convertToCase } = require('./convertToCase');
const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToTransform = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const validation = {
      errors: [],
    };

    if (!textToTransform) {
      validation.errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      validation.errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!(allowedCases.includes(toCase)) && toCase) {
      validation.errors.push({
        message: `This case is not supported. Available cases: ${allowedCases.join(', ')}.`,
      });
    }

    if (validation.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(validation));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToTransform, toCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: textToTransform,
      convertedText,
    }));
  });

  return server;
}

createServer();

module.exports = {
  createServer,
};
