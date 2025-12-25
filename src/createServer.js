const http = require('http');
const convertToCase = require('./convertToCase/convertToCase').convertToCase;
const getErrors = require('./getErrors').getErrors;

function createServer() {
  const server = http.createServer((request, response) => {
    const currentURL = new URL('htto://' + request.url);

    response.setHeader('Content-Type', 'application/json');

    const requestText = currentURL.pathname.slice(1);
    const requestCase = currentURL.searchParams.get('toCase');
    const errors = getErrors(requestText, requestCase);

    if (!errors.errors.length) {
      const {
        convertedText,
        originalCase,
      } = convertToCase(requestText, requestCase);

      const convertResult = {
        originalCase,
        targetCase: requestCase,
        originalText: requestText,
        convertedText,
      };

      response.end(JSON.stringify(convertResult));
    } else {
      response.end(JSON.stringify(errors));
    }
  });

  return server;
}

module.exports = { createServer };
