const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateURL } = require('./validateURL');

function createServer() {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const originalText = request.url.split('?')[0].slice(1);
    const queryString = request.url.split('?')[1];
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');

    const validationResult = validateURL(originalText, targetCase);

    if (validationResult.errors.length === 0) {
      response.statusCode = 200;
      response.statusMessage = 'OK';

      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      response.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    } else {
      response.statusCode = 400;
      response.statusMessage = 'Bad Request';

      response.write(JSON.stringify(validationResult));
      response.end();
    }
  });
}

module.exports = {
  createServer,
};
