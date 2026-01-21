const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { errorsHandler } = require('./errorsHandler');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);
    const errors = errorsHandler(textToConvert, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const converted = convertToCase(textToConvert, toCase);
    const { caseName, text } = converted;
    const data = {
      originalCase: caseName,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: text,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(data));
  });

  return server;
}

createServer();

module.exports = {
  createServer,
};
