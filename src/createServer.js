const http = require('http');

const { checkURL } = require('./checkURL');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const path = request.url.slice(1);
    const [text, queryParams] = path.split('?');
    const params = new URLSearchParams(queryParams);
    const toCase = params.get('toCase');
    const errors = checkURL(text, toCase);

    if (errors.length) {
      response.statusCode = 400;
      response.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    const result = JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    });

    response.statusCode = 200;
    response.statusMessage = 'OK';

    response.end(result);
  });
};

module.exports = {
  createServer,
};
