const http = require('http');
const { convertToCase } = require('./convertToCase');
const { requestValidate } = require('./convertToCase/requestValidate.js');

function createServer() {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const url = new URL(request.url, `http://${request.headers.host}`);
    const receivedData = {};

    receivedData.originalText = url.pathname.slice(1);

    receivedData.targetCase = url.searchParams.get('toCase');

    const errorsMessage = requestValidate(
      receivedData.originalText,
      receivedData.targetCase,
    );

    if (errorsMessage) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';

      response.end(JSON.stringify({ errors: errorsMessage }));
    }

    const convertedData = convertToCase(
      receivedData.originalText,
      receivedData.targetCase,
    );
    const responseData = Object.assign(convertedData, receivedData);

    response.statusCode = 200;
    response.statusMessage = 'OK';

    response.end(JSON.stringify(responseData));
  });

  return server;
};

module.exports.createServer = createServer;
