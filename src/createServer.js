const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./getErrors');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

    const errors = getErrors(textToConvert, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    const result = {
      originalCase: originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });
}

module.exports = {
  createServer,
};
