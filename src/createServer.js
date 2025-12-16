const http = require('http');
const { getRequestParams } = require('./getRequestParams');
const { validateRequestParams } = require('./validateRequestParams');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const params = getRequestParams(request);
    const errors = validateRequestParams(params);

    if (errors.errors.length) {
      response.statusCode = 400;
      response.end(JSON.stringify(errors), 'utf-8');

      return;
    }

    const result = convertToCase(params.originalText, params.targetCase);
    const payload = Object.assign({}, params, result);

    response.end(JSON.stringify(payload), 'utf-8');
  });

  return server;
}

module.exports = { createServer };
