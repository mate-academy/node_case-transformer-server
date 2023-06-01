'use strict';

const http = require('http');
const { getParamsOfUrl } = require('./getParamsOfUrl');
const { urlValidation } = require('./urlValidation');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, toCase] = getParamsOfUrl(req);

    const errors = urlValidation(text, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ errors }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });

    const result = convertToCase(text, toCase);

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
