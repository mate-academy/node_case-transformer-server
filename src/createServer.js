const http = require('http');
const { validateData } = require('./validateData');
const { convertToCase } = require('./convertToCase/convertToCase')

function createServer() {
  const server = http.createServer((request, response) => {
    const normalizedURL = new URL(request.url, `http://${request.headers.host}`);
    const [path, queryParams] = request.url.split('?');
    const textToConvert = path.slice(1);

    const params = new URLSearchParams(queryParams);
    const toCase = params.get('toCase');
    const errors = validateData(textToConvert, toCase);

    response.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';

      response.end(JSON.stringify({
        errors,
      }))
    } else {
      convertedText = convertToCase(textToConvert, toCase);

      const serverResponse = {
        originalCase: convertedText.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convertedText.convertedText,
      }

      response.statusCode = 200;
      response.statusMessage = 'OK';

      response.end(JSON.stringify(serverResponse));
    }
  });

  return server;
}

module.exports.createServer = createServer;
