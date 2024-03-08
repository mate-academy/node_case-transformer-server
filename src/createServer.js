/* eslint-disable max-len */
const http = require('node:http');
const { getContentToConvert } = require('./getContentToConvert');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = getContentToConvert(req.url);
    const convertTo = normalizedURL.searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({ message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!convertTo) {
      errors.push({ message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (convertTo && !supportedCases.includes(convertTo.toUpperCase())) {
      errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, convertTo);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: convertTo,
      originalText: textToConvert,
      convertedText: result.convertedText,
    }));
  });
};

module.exports = { createServer };
