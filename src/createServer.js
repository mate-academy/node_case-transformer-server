const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkErrors } = require('./ckeckErrors');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const errors = checkErrors(textToConvert, targetCase);

    if (errors) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });

      const errorMessages = {
        errors: errors.map(error => ({
          message: error,
        })),
      };

      res.end(JSON.stringify(errorMessages));
    } else {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        targetCase,
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText: textToConvert,
          convertedText,
        }),
      );
    }
  });
}

module.exports = {
  createServer,
};
