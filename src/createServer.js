const http = require('http');
const { URL } = require('url')
const {convertToCase } = require('./convertToCase/convertToCase');

const availableCases = ['SNAKE', 'CAMEL', 'PASCAL', 'KEBAB', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'text/plain');

    const newUrl = new URL(req.url, `http://${req.headers.host}`);

    const targetCase = newUrl.searchParams.get('toCase');
    const textToConvert = newUrl.pathname.slice(1);

    if (!textToConvert) {
      res.statusCode = 400;
      res.end('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');

      return;
    }

    if (!targetCase) {
      res.statusCode = 400;
      res.end('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');

      return;
    }

    if (availableCases.every(availableCase => availableCase !== targetCase)) {
      res.statusCode = 400;
      res.end(`This case is not supported. Available cases: ${availableCases.join(', ')}`);

      return;
    }

    try {
      const { originalCase, convertedText } = convertToCase(textToConvert, targetCase);

      res.end(JSON.stringify({
        "originalCase": originalCase,
        "targetCase": targetCase,
        "originalText": textToConvert,
        "convertedText": convertedText,
      }));
    } catch (error) {
      console.error('Something bad happened', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });
}

module.exports = { createServer };
