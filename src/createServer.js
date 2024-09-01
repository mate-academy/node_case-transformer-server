const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkErrors } = require('./checkErrors');

function createServer() {
  return http.createServer((req, res) => {
    const [text, serchParams] = req.url.split('?');
    const normalizedText = text.slice(1);

    const normalizedParams = new URLSearchParams(`?${serchParams}`);
    const toCase = normalizedParams.get('toCase');
    const errors = checkErrors(normalizedText, toCase);

    res.setHeader('content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.write(JSON.stringify({ errors }));
      res.end();

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      normalizedText,
      toCase,
    );

    const responseBody = {
      originalCase: originalCase,
      targetCase: toCase,
      originalText: normalizedText,
      convertedText: convertedText,
    };

    res.on('error', (e) => {
      res.statusCode = 400;
      res.statusMessage = 'Something went wrong';
      res.end();
    });

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.write(JSON.stringify(responseBody));
    res.end();
  });
}

module.exports = {
  createServer,
};
