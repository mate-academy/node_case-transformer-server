const { convertToCase } = require('./convertToCase/convertToCase');

function sendErrorResponse(response, errors) {
  response.statusCode = 400;
  response.statusMessage = 'Bad request';

  response.end(JSON.stringify({ errors }));
};

function sendSuccessResponse(response, originalText, targetCase) {
  const {
    originalCase,
    convertedText,
  } = convertToCase(originalText, targetCase);

  response.statusCode = 200;

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
