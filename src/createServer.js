/* eslint-disable max-len */
/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorsCheck } = require('./errorMessages');

function createServer() {
  const server = http.createServer((rq, res) => {
    const [pathName, queryParams] = rq.url.split('?');
    const originalText = pathName.slice(1);
    const params = new URLSearchParams(queryParams);
    const targetCase = params.get('toCase');

    const errors = errorsCheck(originalText, targetCase);

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    const formattedResponse = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(formattedResponse));
  });

  return server;
};

module.exports = {
  createServer,
};
