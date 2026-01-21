/* eslint-disable no-console */
'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { messageError } = require('./services/messageError.js');

const createServer = () => {
  const server = http.createServer((request, respons) => {
    respons.setHeader('Content-type', 'application/json');

    const [inputText, inputCase] = request.url.split('?');
    const originalText = inputText.slice(1);
    const targetCase = new URLSearchParams(inputCase).get('toCase');
    const errors = messageError(originalText, targetCase);

    if (errors.length) {
      respons.statusCode = 400;
      respons.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    respons.statusCode = 200;

    respons.end(JSON.stringify(result));
  });

  return server;
};

module.exports = {
  createServer,
};
