'use strict';

const http = require('http');
const { getDataURL } = require('./convertToCase/getDataURL');
const { getErrors } = require('./convertToCase/getErrors');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const [originalText, targetCase] = getDataURL(req.url);

    const errors = getErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
