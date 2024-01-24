const http = require('http');
const { parseRequestUrl, validateData } = require('./utils');
const { sendErrorResponse, sendSuccessResponse } = require('./reponseHandlers');

function createServer() {
  const server = http.createServer((request, response) => {
    if (request.url !== '/favicon.ico') {
      const { targetCase, originalText } = parseRequestUrl(request);

      response.setHeader('Content-Type', 'application/json');

      const { errors } = validateData(targetCase, originalText);

      if (errors.length) {
        sendErrorResponse(response, errors);

        return;
      }

      sendSuccessResponse(response, originalText, targetCase);
    }
  });

  return server;
}

module.exports = {
  createServer,
};
