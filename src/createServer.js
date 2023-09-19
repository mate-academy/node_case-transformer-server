'use strict';

const http = require('http');
const { checkErrors } = require('./validation');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, 'http://localhost:5700');

    const textToConvert = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = checkErrors(textToConvert, targetCase);

    let resultObj = {};

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      resultObj = {
        errors,
      };
    } else {
      const convertingResult = convertToCase(textToConvert, targetCase);

      resultObj = {
        originalCase: convertingResult.originalCase,
        targetCase,
        originalText: textToConvert,
        convertedText: convertingResult.convertedText,
      };
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(resultObj));
  });

  return server;
};

module.exports.createServer = createServer;
