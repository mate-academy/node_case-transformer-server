/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkData } = require('./checkData');

const createServer = () => {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const url = new URL(request.url, `http://${request.headers.host}`);

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const error = checkData(originalText, targetCase);

    if (error.errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';

      response.end(JSON.stringify(error));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      response.statusCode = 200;
      response.statusMessage = 'OK';

      const resultRespone = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      response.end(JSON.stringify(resultRespone));
    }
  });
};

module.exports = { createServer };
