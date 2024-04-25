/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const availableToCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const normalizedUrl = new URL(req.url, 'http://localhost:5700');
    const convertingText = normalizedUrl.pathname.slice(1);
    const caseName = normalizedUrl.searchParams.get('toCase');
    const errors = [];

    if (!convertingText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseName) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableToCases.includes(caseName)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const convertedText = convertToCase(convertingText, caseName);

      res.statusCode = 200;

      const respBody = {
        originalCase: convertedText.originalCase,
        targetCase: caseName,
        originalText: convertingText,
        convertedText: convertedText.convertedText,
      };

      res.end(JSON.stringify(respBody));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
};

module.exports = { createServer };
