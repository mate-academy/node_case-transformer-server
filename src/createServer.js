/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorValidation } = require('./errorValidation');

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const [pathName, queryParams] = request.url.split('?');
    const text = pathName.slice(1);
    const params = new URLSearchParams(queryParams);
    const toCase = params.get('toCase');

    const errors = errorValidation(text, toCase);

    if (errors.length) {
      const errorResponse = {
        errors,
      };

      response.statusCode = 400;
      response.statusText = 'Bad request';

      response.end(JSON.stringify(errorResponse));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);
    const dataText = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    response.end(JSON.stringify(dataText));
  });

  return server;
};

module.exports = { createServer };
