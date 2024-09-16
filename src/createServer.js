const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validation');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const { url } = req;
    const [text, queryString] = url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = text.slice(1);
    const payload = validate(textToConvert, toCase);

    if (payload.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(payload));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textToConvert, toCase);

      const response = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
