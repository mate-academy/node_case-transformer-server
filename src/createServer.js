const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkRequestParameters } = require('./dataValidation/checkValidData');

const http = require('http');

const createServer = () => {
  const server = http.createServer((req, res) => {
    let responseBody = {};

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const text = normalizedURL.pathname.slice(1);

    const errors = checkRequestParameters(text, toCase);

    if (errors.length === 0) {
      res.statusCode = 200;

      const originalData = convertToCase(text, toCase);

      responseBody = {
        originalCase: detectCase(text),
        targetCase: toCase,
        originalText: text,
        convertedText: originalData.convertedText,
      };
    } else {
      res.statusCode = 400;

      responseBody = {
        errors,
      };
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = { createServer };
