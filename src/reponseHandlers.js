const { convertToCase } = require('./convertToCase/convertToCase');
const { BAD_REQUEST, OK_REQUEST } = require('./responseHeaders');

function sendErrorResponse(response, errors) {
  response.statusCode = BAD_REQUEST.code;
  response.message = BAD_REQUEST.message;

  response.end(JSON.stringify({ errors }));
};

function sendSuccessResponse(response, originalText, targetCase) {
  const {
    originalCase,
    convertedText,
  } = convertToCase(originalText, targetCase);

  response.statusCode = OK_REQUEST.code;
  response.message = OK_REQUEST.message;

  response.end(JSON.stringify({
    originalCase,
    targetCase,
    originalText,
    convertedText,
  }));
}

module.exports = {
  sendErrorResponse,
  sendSuccessResponse,
};
