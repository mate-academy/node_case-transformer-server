const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkParams } = require('./checkParams');

function createServer() {
  return http.createServer((req, res) => {
    const normalaizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalaizedUrl.pathname.slice(1);
    const neededCase = normalaizedUrl.searchParams.get('toCase');

    const validation = checkParams(textToConvert, neededCase);

    if (validation.errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(validation));
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, neededCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify({
      originalCase,
      targetCase: neededCase,
      originalText: textToConvert,
      convertedText,
    }));
  });
}

module.exports = { createServer };
