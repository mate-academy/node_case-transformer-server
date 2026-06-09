/* eslint-disable no-console */
const { convertToCase } = require('./convertToCase/convertToCase');
const { getErrorMessage } = require('./getErrorMessage');

function createServer() {
  const http = require('http');
  const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.statusMessage = 'Bad request';
      res.statusCode = 400;
    } else if (req.url === '/') {
      res.setHeader('Content-Type', 'application/json');
      res.statusMessage = 'Bad request';
      res.statusCode = 400;
    } else {
      const [textPart, queryString] = req.url.split('?');
      const text = textPart.slice(1) || '';
      const params = new URLSearchParams(queryString);
      const toCase = params.get('toCase');
      const errorMessage = getErrorMessage(textPart, toCase);

      res.setHeader('Content-Type', 'application/json');

      if (errorMessage.errors.length > 0) {
        res.statusCode = 400;
        res.write(JSON.stringify(errorMessage));
        res.statusMessage = 'Bad request';

        return;
      }

      const { originalCase, convertedText } = convertToCase(text, toCase);

      res.setHeader('Content-Type', 'application/json');

      const response = {
        originalCase: originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: convertedText,
      };

      res.statusMessage = 'OK';
      res.statusCode = 200;
      res.end(JSON.stringify(response));
    }

    res.end('');
  });

  return server;
}

module.exports = {
  createServer,
};
