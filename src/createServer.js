const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getErrors } = require('./getErrors');
const { splitUrl } = require('./splitUrl');

function createServer() {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const fullUrl = request.url;
    const errors = getErrors(fullUrl);

    if (errors.length) {
      response.statustext = 'Bad request';
      response.statusCode = 400;

      return response.end(JSON.stringify({ errors }));
    }

    const { originalText, targetCase } = splitUrl(fullUrl);
    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    response.statustext = 'OK';
    response.statusCode = 200;

    return response.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
