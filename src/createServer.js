'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkData } = require('./checkData');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const caseName = normalizedUrl.searchParams.get('toCase');
    const errors = checkData(text, caseName);

    res.setHeader('content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const resultOfConversation = convertToCase(text, caseName);

    res.statusCode = 200;
    res.statusMessage = 'Bad request';

    res.end(JSON.stringify({
      ...resultOfConversation,
      originalText: text,
      targetCase: caseName,
    }));
  });
};

module.exports.createServer = createServer;
