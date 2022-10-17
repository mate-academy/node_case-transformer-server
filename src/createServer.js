/* eslint-disable no-console */

const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const textToConvert = String(req.url).split('?')[0].slice(1);
  const toCase = new URLSearchParams(url.searchParams).get('toCase');

  res.setHeader('Content-Type', 'application/json');

  const errors = [];
  const supportedCases = [
    'SNAKE',
    'KEBAB',
    'CAMEL',
    'PASCAL',
    'UPPER',
  ];

  if (!textToConvert) {
    errors.push({
      message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!supportedCases.includes(toCase)) {
    errors.push({
      message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length) {
    res.statusCode = 400;
    res.statusText = 'Bad request';

    res.end(JSON.stringify(errors));

    return;
  }

  const conversionResult = convertToCase(textToConvert, toCase);

  res.statusCode = 200;

  res.end(JSON.stringify({
    originalCase: conversionResult.originalCase,
    targetCase: toCase,
    originalText: textToConvert,
    convertedText: conversionResult.convertedText,
  }));
});

module.exports = { createServer };
