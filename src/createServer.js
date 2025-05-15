/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

'use strict';

const http = require('http');
const { detectCase } = require('./detectCase');
const { toWords } = require('./toWords');
const { wordsToCase } = require('./wordsToCase');

const SUPPORTED_CASES = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Parse the request URL
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname.slice(1);
    const targetCase = parsedUrl.searchParams.get('toCase');

    const errors = [];

    // Validate input
    if (!pathname) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.has(targetCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ errors }));
    }

    // Detect original case
    const originalCase = detectCase(pathname);

    // Convert text to words
    const words = toWords(pathname, originalCase);

    // Convert words to target case
    const convertedText = wordsToCase(words, targetCase);

    // Send response
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText: pathname,
        convertedText,
      }),
    );
  });
}

module.exports = { createServer };
