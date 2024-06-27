const http = require('http');
const { convertToCase } = require('./convertToCase');
const {
  sendJsonResponse,
  respondWithError,
  validateRequest,
} = require('./utils');

function createServer() {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  return http.createServer((req, res) => {
    const { url: reqUrl } = req;
    const [path, queryString] = reqUrl.split('?');

    const text = path.substring(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = validateRequest(text, toCase, supportedCases);

    if (errors.length > 0) {
      return respondWithError(res, errors);
    }

    const result = convertToCase(text, toCase);

    sendJsonResponse(res, 200, {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    });
  });
}

module.exports = {
  createServer,
};
