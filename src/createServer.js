/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateParams } = require('./errorValidation');
const { searchParams } = require('./searchParams');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const [text, toCase] = searchParams(request.url);
    const errors = validateParams(text, toCase);

    if (errors.length) {
      const errorResponse = {
        errors,
      };

      sendResponse(response, errorResponse, 400);

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);
    const dataText = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    sendResponse(response, dataText);
  });

  return server;
};

module.exports = { createServer };
