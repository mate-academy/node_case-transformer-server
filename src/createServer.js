'use strict';

const http = require('http');
const { isError } = require('./isError');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const caseToChange = normalizedURL.searchParams.get('toCase');
    const inputPathName = normalizedURL.pathname.slice(1);
    const errors = isError(caseToChange, inputPathName);

    res.setHeader('Content-Type', 'application/json');

    if(errors) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({errors}));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const { originalCase, convertedText } = convertToCase(inputPathName, caseToChange);

    const responseData = {
      "originalCase": originalCase,
      "targetCase": caseToChange,
      "originalText": inputPathName,
      "convertedText": convertedText
    };
    res.end(JSON.stringify(responseData));
  });

  return server;
}

module.exports = { createServer };
