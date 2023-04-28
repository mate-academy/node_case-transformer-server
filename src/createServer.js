const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./getErrors');

const createServer = () => {
  return http.createServer((request, response) => {
    const [text, searchParams] = request.url.slice(1).split('?');
    const params = new URLSearchParams(searchParams);
    const toCase = params.get('toCase');
    const errors = getErrors(text, toCase);

    response.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      response.statusCode = 400;
      response.end(JSON.stringify({ errors }));

      return;
    }

    response.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(text, toCase);

    response.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    }));
  });
};

module.exports = {
  createServer,
};
