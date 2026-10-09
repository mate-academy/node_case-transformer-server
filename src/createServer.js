'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');

const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const [urlText, queryString = ''] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    let textToConvert = '';

    try {
      textToConvert = decodeURIComponent(urlText.slice(1));
    } catch {
      textToConvert = '';
    }

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!AVAILABLE_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
