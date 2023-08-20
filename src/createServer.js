const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { errorHandler } = require('./ErrorHandler');

const caseOptions = {
  SNAKE: 'SNAKE',
  KEBAB: 'KEBAB',
  UPPER: 'UPPER',
  CAMEL: 'CAMEL',
  PASCAL: 'PASCAL',
};

function createServer() {
  const server = http.createServer((request, response) => {
    const [path, queryString] = request.url.split('?');

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = path.slice(1);

    const errors = [];

    errorHandler(textToConvert, errors, toCase, caseOptions);

    if (errors.length > 0) {
      response.writeHead(400, { 'Content-Type': 'application/json' });

      response.end(
        JSON.stringify({ errors }),
      );

      return;
    }

    const convertedInput = convertToCase(textToConvert, toCase);

    const res = {
      originalCase: convertedInput.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: convertedInput.convertedText,
    };

    response.writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(res));
  });

  return server;
}

module.exports = { createServer };
