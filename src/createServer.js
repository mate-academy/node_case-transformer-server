const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateParams } = require('./validateParams');
const {
  respondWithError,
  respondWithConversionResult,
} = require('./responses');

function createServer() {
  const server = http.createServer((req, res) => {
    const { url } = req;

    const [path, searchParams] = url.split('?');

    const originalText = path.slice(1);
    const targetCase = new URLSearchParams(searchParams).get('toCase');

    const errors = validateParams(originalText, targetCase);

    if (errors.length) {
      respondWithError(res, errors);

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const conversionInfo = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    respondWithConversionResult(res, conversionInfo);
  });

  return server;
}

module.exports = {
  createServer,
};
