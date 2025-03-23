/* eslint-disable no-console */

const http = require('node:http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { checkErrors } = require('./checkErrors');

function newServer() {
  const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/favicon.ico') {
      return res.end();
    }

    const normalisedUrl = new URL(url, `http://${req.headers.host}`);

    const text = normalisedUrl.pathname.slice(1);
    const toCase = normalisedUrl.searchParams.get('toCase');

    console.log(text, toCase);

    const errors = checkErrors(text, toCase);

    if (errors.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      console.log(res.statusCode);
      res.end(JSON.stringify(errors));
    } else {
      const result = convertToCase(text, toCase);

      const responseBody = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(responseBody));
    }
  });

  return server;
}

// newServer();

module.exports = {
  newServer,
};
