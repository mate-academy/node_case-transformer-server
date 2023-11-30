const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const {
  createResponse,
  processRequest,
  sendErrorResponse,
  sendSuccessResponse,
} = require('./functions/functions');

function createServer() {
  const server = http.createServer((req, res) => {
    const { textToConvert, targetCase, errors } = processRequest(req);

    if (errors.length > 0) {
      return sendErrorResponse(res, errors);
    }

    const result = convertToCase(textToConvert, targetCase);
    const response = createResponse(result, targetCase, textToConvert);

    sendSuccessResponse(res, response);
  });

  return server;
}

module.exports = {
  createServer,
};
