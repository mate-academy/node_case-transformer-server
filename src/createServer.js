/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const convertToCase = require('./convertToCase/convertToCase.js');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const pathText = normalizedURL.pathname.slice(1);
    const query = Object.fromEntries(normalizedURL.searchParams.entries());
    const targetCase = query.toCase;

    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!pathText || pathText.trim() === '') {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader({ 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }),
      );

      return;
    }

    if (!targetCase) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader({ 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
            },
          ],
        }),
      );

      return;
    }

    if (!validCases.includes(targetCase.toUpperCase())) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader({ 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }),
      );

      return;
    }

    const result = convertToCase(pathText, targetCase);
    const { originalCase, convertedText } = result;

    const objOfResult = {
      originalCase: originalCase,
      targetCase: targetCase,
      originalText: pathText,
      convertedText: convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader({ 'Content-Type': 'application/json' });
    res.end(JSON.stringify(objOfResult));
  });
}

module.exports = {
  createServer,
};
