const http = require('http');

const { convertToCase } = require('./convertToCase');
const { dataValidate } = require('./dataValidate');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = dataValidate({ originalText, targetCase });

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      const errorPayload = { errors };

      res.end(JSON.stringify(errorPayload));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const succesPayload = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(succesPayload));
  });
}

createServer();

module.exports = { createServer };
