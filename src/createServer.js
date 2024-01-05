/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { errorMessages } = require('./errorMessages');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

    const toCase = searchParams.get('toCase');
    const mormalizedPath = pathname.slice(1);
    const errors = errorMessages(mormalizedPath, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const convertedText = convertToCase(mormalizedPath, toCase);

    res.end(JSON.stringify({
      ...convertedText,
      targetCase: toCase,
      originalText: mormalizedPath,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
