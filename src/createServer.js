'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { normalizeURL } = require('./normalizeUrl');
const { validateErrors } = require('./validateErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const sendResponse = (response, statusCode, data) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = statusCode;
      res.statusText = response;

      res.end(data);
    };

    const paramsToConvert = normalizeURL(req.url);

    const errors = validateErrors(...paramsToConvert);

    if (errors.length > 0) {
      sendResponse('Bad request', 400, JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(...paramsToConvert);

    sendResponse('OK', 200, JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase: paramsToConvert[1],
      originalText: paramsToConvert[0],
      convertedText: convertedText.convertedText,
    }));
  });

  return server;
};

module.exports.createServer = createServer;
