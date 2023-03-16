/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkErrors } = require('./checkErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const originalText = normalizedURL.pathname.slice(1);

    const targetCase = normalizedURL.searchParams.get('toCase');

    const errors = checkErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 404;
      res.statusMessage = 'Request not valid';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText
      = convertToCase(
        originalText,
        targetCase,
      );

    const requestData = JSON.stringify({
      ...convertedText,
      originalText,
      targetCase,
    });

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(requestData);
  });

  return server;
};

module.exports = { createServer };
