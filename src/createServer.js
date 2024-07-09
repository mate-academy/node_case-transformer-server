const http = require('node:http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { validateParams } = require('./validation');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase') || '';
    const textToConvert = text.slice(1);

    const errors = validateParams(textToConvert, toCase);

    if (errors.length > 0) {
      const data = JSON.stringify({ errors });

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(data);

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    result.targetCase = toCase;
    result.originalText = textToConvert;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
