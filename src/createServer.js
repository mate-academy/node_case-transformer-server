/* eslint no-console: ["error", { allow: ["log"] }] */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { queriesError } = require('./queriesError');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    const [textToConvert, queryString] = req.url.slice(1).split('?');

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const error = queriesError(textToConvert, toCase);

    if (error.payload.errors.length) {
      res.statusCode = error.status;
      res.statusMessage = error.statusText;
      res.end(JSON.stringify(error.payload));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textToConvert, toCase);

      res.body = JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      });

      res.end(res.body);
    }
  });

  return server;
};

module.exports = {
  createServer,
};
