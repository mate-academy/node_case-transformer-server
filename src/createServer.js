const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const splited = req.url.split('?');

    const errors = [];

    let searchParams = '';
    let wordToConvert = '';
    let body = {};

    if (splited.length === 2) {
      searchParams = new URLSearchParams(splited[1]);
      wordToConvert = splited[0].slice(1);

      const convertTo = searchParams.get('toCase');

      if (convertTo === 'SNAKE'
      || convertTo === 'KEBAB'
      || convertTo === 'CAMEL' || convertTo === 'PASCAL'
      || convertTo === 'UPPER') {
        body = convertToCase(wordToConvert, convertTo);
      } else {
        errors.push({ message: 'This case is not supported.'
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
      }

      body.targetCase = convertTo;
      body.originalText = wordToConvert;
    }

    res.setHeader('Content-Type', 'application/json');

    if (splited[0] === '/') {
      errors.push({ message: 'Text to convert is required.'
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (splited[1] === undefined) {
      errors.push({ message: '"toCase" query param is required.'
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (errors.length === 0) {
      res.statusCode = 200;
      res.end(JSON.stringify(body));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }
  });
}

module.exports = { createServer };
