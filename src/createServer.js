const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkerErrors } = require('./CheckerErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const paramsSplitted = req.url.split('?');
    const messageToConvert = paramsSplitted[0].slice(1);
    const params = new URLSearchParams(paramsSplitted[1]);
    const paramsToConvert = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = checkerErrors(messageToConvert, paramsToConvert);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(messageToConvert, paramsToConvert);

    const serverRespone = {
      targetCase: paramsToConvert,
      originalText: messageToConvert,
      originalCase,
      convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(serverRespone));
  });

  return server;
}

module.exports = { createServer };
