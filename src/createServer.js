const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkRequestParameters } = require('./dataValidation/checkValidData');

const http = require('http');

const createServer = () => {
  const server = http.createServer((req, res) => {
    let answerBody = {};

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const text = normalizedURL.pathname.slice(1);

    const errorMessage = checkRequestParameters(text, toCase);

    if (errorMessage.length === 0) {
      res.statusCode = 200;

      const originalData = convertToCase(text, toCase);

      answerBody = {
        originalCase: detectCase(text),
        targetCase: toCase,
        originalText: text,
        convertedText: originalData.convertedText,
      };
    } else {
      res.statusCode = 400;

      answerBody = {
        errors: [...errorMessage],
      };
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(answerBody));
  });

  return server;
};

module.exports = { createServer };
