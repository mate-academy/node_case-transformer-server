const http = require('node:http');
const { convertToCase } = require('./convertToCase');
const { processErrors } = require('./utils/processErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, queryString] = req.url.slice(1).split('?');
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const errors = processErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const requestResult = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';
    res.end(JSON.stringify(requestResult));
  });

  return server;
}

module.exports = { createServer };
