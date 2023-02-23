// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validationUrl } = require('./validationUrl');

const createServer = () => {
  const server = http.createServer((request, response) => {
    const normalizedUrl = new URL(request.url, `http://${request.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = validationUrl(originalText, toCase);

    response.setHeader('content-type', 'application/json');

    if (errors.length) {
      response.statusCode = '400';
      response.statusMessage = 'Bad request';
      response.end(JSON.stringify({ errors }));

      return;
    };

    const convertedCase = convertToCase(originalText, toCase);

    response.statusCode = '200';
    response.statusMessage = 'ok';

    response.end(JSON.stringify({
      originalCase: convertedCase.originalCase,
      targetCase: toCase,
      originalText,
      convertedText: convertedCase.convertedText,
    }));
  });

  return server;
};

module.exports.createServer = createServer;
