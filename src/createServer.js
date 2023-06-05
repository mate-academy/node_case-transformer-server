const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkParams } = require('./checkParams');
const { normalaizeUrl } = require('./normalaizeUrl');

function createServer() {
  return http.createServer((req, res) => {
    const {
      textToConvert,
      neededCase,
    } = normalaizeUrl(req.url, req.headers.host);

    const validation = checkParams(textToConvert, neededCase);

    function responseSendler(stat) {
      res.writeHead(stat, { 'Content-Type': 'application/json' });
    }

    if (validation.errors.length) {
      responseSendler(400);

      return res.end(JSON.stringify(validation));
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, neededCase);

    responseSendler(200);

    return res.end(JSON.stringify({
      originalCase,
      targetCase: neededCase,
      originalText: textToConvert,
      convertedText,
    }));
  });
}

module.exports = { createServer };
