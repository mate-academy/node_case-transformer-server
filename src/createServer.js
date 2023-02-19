/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { isError } = require('./isError');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const forPreparingUrl = req.url.split('?');

    const originalText = forPreparingUrl[0].replace('/', '');

    const params = new URLSearchParams(forPreparingUrl[1]);
    const targetCase = params.get('toCase');

    const errors = isError(originalText, targetCase);

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    const { convertedText, originalCase } = convertToCase(originalText, targetCase);

    const preparedToShow = {
      convertedText,
      originalCase,
      originalText,
      targetCase,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(preparedToShow));
  });

  return server;
}

module.exports = { createServer };
