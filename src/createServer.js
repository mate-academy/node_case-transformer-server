const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const textToConvert = decodeURIComponent(path.slice(1));
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
        Status: 'Bad Request',
      });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    const responseBody = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json', Status: 'OK' });
    res.end(JSON.stringify(responseBody));
  });
}

module.exports = { createServer };
