const http = require('http');
const { getUrlParams } = require('./getUrlParams');
const { checkUrl } = require('./checkUrl');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const [text, query] = request.url.split('?');
    const { originalText, targetCase } = getUrlParams(text, query);

    const errors = checkUrl(originalText, targetCase);

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';

      response.end(
        JSON.stringify({
          errors,
        }),
      );

      return;
    }

    response.statusCode = 200;
    response.statusMessage = 'OK';

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    response.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
};

module.exports = { createServer };
