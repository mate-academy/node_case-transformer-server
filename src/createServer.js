/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./validate');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url.slice(1);
    const [textToConvert, params] = url.split('?');

    const urlParams = new URLSearchParams(params);
    const toCase = urlParams.get('toCase');

    const validationResult = validate(textToConvert, toCase);

    const { valid, statusCode, statusText, errors } = validationResult;

    if (!valid) {
      res.statusCode = statusCode;
      res.statusText = statusText;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
