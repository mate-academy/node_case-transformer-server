const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { handleErrors } = require('./HandleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);

    const textToConvert = text.slice(1);
    const toCase = params.get('toCase');
    const errors = handleErrors(textToConvert, toCase);

    if (errors.length > 0) {
      res.writeHead(400, 'Bad Request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(textToConvert, toCase).convertedText;
    const originalCase = convertToCase(textToConvert, toCase).originalCase;

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
