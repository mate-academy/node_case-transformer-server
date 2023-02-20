const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateURL } = require('./validateURL');

function createServer() {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(request.url, `http://${request.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = validateURL(originalText, targetCase);

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Bad Request';

      response.end(JSON.stringify({ errors }));

      return;
    }

    response.statusCode = 200;
    response.statusMessage = 'OK';

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const responseData = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    response.end(JSON.stringify(responseData));
  });
}

module.exports = {
  createServer,
};
