'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getUrlErrors } = require('./getUrlErrors');

function createServer() {
  const server = http.createServer((req, resp) => {
    resp.setHeader('Content-type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = getUrlErrors(originalText, targetCase);

    if (errors.length) {
      resp.statusCode = 400;
      resp.statusMessage = 'Bad request';
      resp.end(JSON.stringify({ errors }));

      return;
    }

    resp.statusCode = 200;
    resp.statusMessage = 'OK';

    const { originalCase, convertedText }
      = convertToCase(originalText, targetCase);

    const responseData = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    resp.end(JSON.stringify(responseData));
  });

  return server;
}

exports.createServer = createServer;
