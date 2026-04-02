const http = require('http');
const { getResponseData } = require('./getResponseData.js');

function createServer() {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    if (request.method !== 'GET') {
      response.statusCode = 404;
      response.end(JSON.stringify({ message: 'Not Found' }));

      return server;
    }

    const responseData = getResponseData(request.url);

    if (responseData.errors) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
    } else {
      response.statusCode = 200;
      response.statusMessage = 'OK';
    }

    response.write(JSON.stringify(responseData));
    response.end();
  });

  return server;
}

module.exports = {
  createServer,
};
