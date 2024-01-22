const http = require('http');

const { checkedErrors } = require('./checkedErrors.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(request.url, 'http://localhost:5700');

    const originalText = normalizedURL.pathname.slice(1) || '';
    const targetCase = normalizedURL.searchParams.get('toCase') || '';

    const errors = checkedErrors(originalText, targetCase);

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.end(JSON.stringify({ errors }));
    }

    if (!errors.length) {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      response.statusCode = 200;
      response.statusMessage = 'OK';

      const responseData = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      response.end(JSON.stringify(responseData));
    }
  });
};

module.exports = {
  createServer,
};
