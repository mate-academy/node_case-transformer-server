const http = require('http');
const { URL } = require('url')
const {convertToCase } = require('./convertToCase/convertToCase');

const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const newUrl = new URL(req.url, `http://${req.headers.host}`);

    const targetCase = newUrl.searchParams.get('toCase');
    const textToConvert = newUrl.pathname.slice(1);

    const isError = !textToConvert
    || !targetCase
    || availableCases.every(availableCase => availableCase !== targetCase);

    if (isError) {
      const errors = [];

      if (!textToConvert) {
        errors.push({
          "message": 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
        })
      }

      if (!targetCase) {
        errors.push({
          "message": '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        })
      }

      if (availableCases.every(availableCase => availableCase !== targetCase && targetCase)) {
        errors.push({
          "message": `This case is not supported. Available cases: ${availableCases.join(', ')}.`
        })
      }

        res.writeHead(400, 'Bad request');
        res.statusCode = 400;
        res.end(JSON.stringify({"errors": errors}))
    } else {
      const { originalCase, convertedText } = convertToCase(textToConvert, targetCase);

      res.writeHead(200, "OK");

      res.end(JSON.stringify({
        "originalCase": originalCase,
        "targetCase": targetCase,
        "originalText": textToConvert,
        "convertedText": convertedText,
      }));
    }
  });
}


module.exports = { createServer };
