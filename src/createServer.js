'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validate');
const { getResponse } = require('./getResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    const targetCase = normalizedUrl.searchParams.get('toCase');
    const originalText = normalizedUrl.pathname.slice(1);

    const validationResult = validate(targetCase, originalText);

    if (validationResult.errors.length) {
      getResponse(res, 400, validationResult);
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      const response = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      getResponse(res, 200, response);
    }
  });

  return server;
};

module.exports = {
  createServer,
};
