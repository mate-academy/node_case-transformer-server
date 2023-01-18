'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { normalizeURL } = require('./normalizeUrl');
const { validateErrors } = require('./validateErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const paramsToConvert = normalizeURL(req.url);

    const errors = validateErrors(...paramsToConvert);

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const convertedText = convertToCase(...paramsToConvert);

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase: paramsToConvert[1],
      originalText: paramsToConvert[0],
      convertedText: convertedText.convertedText,
    }));
  });

  return server;
};

module.exports = { createServer };
