'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validation = function (textToConvert, toCase, errors) {
  const isToCaseExist = SUPPORTED_CASES.includes(toCase);

  if (!textToConvert) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });

    return;
  }

  if (!isToCaseExist) {
    errors.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }
};

function createServer() {
  const server = http.createServer((req, res) => {
    const [urlText, query] = req.url.split('?');
    const textToConvert = urlText.slice(1);
    const toCase = new URLSearchParams(query).get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    validation(textToConvert, toCase, errors);

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        convertedText: result.convertedText,
        originalCase: result.originalCase,
        originalText: textToConvert,
        targetCase: toCase,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
