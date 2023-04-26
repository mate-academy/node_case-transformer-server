/* eslint-disable no-console */
const http = require('http');
const { errorMessages } = require('./errorMessages');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const splitedURL = req.url.split('?');
    const params = new URLSearchParams(splitedURL[1]);
    const targetCase = params.get('toCase');
    const originalText = splitedURL[0].slice(1);
    const errors = errorMessages(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    const convertedText = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      ...convertedText,
      targetCase,
      originalText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
