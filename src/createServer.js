'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { parseUrl } = require('./parseUrl.js');
const { validateUrl } = require('./validateUrl');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [textToConvert, toCase] = parseUrl(req);
    const errors = validateUrl(textToConvert, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }
    res.statusCode = 200;
    res.statusMessage = 'OK';

    const { originalCase, convertedText }
      = convertToCase(textToConvert, toCase);

    const jsonResponse = {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    };

    res.end(JSON.stringify(jsonResponse));
  });

  return server;
}

module.exports = {
  createServer,
};
