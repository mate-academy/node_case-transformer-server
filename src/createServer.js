const http = require('http');
const { convertToCase } = require('./convertToCase/');
const { getParams } = require('./getParams');
const { sendResponse } = require('./sendResponse');
const { validateParams } = require('./validateParams');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [textToConvert, toCase] = getParams(req.url);
    const errors = validateParams(textToConvert, toCase);

    if (errors.length > 0) {
      const responseError = {
        errors,
      };

      sendResponse(res, responseError, 400);

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(textToConvert, toCase);

    const dataText = {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    };

    sendResponse(res, dataText);
  });

  return server;
};

module.exports = { createServer };
