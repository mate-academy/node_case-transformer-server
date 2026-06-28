// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const TEXT_REQUIRED_MESSAGE =
  'Text to convert is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const TO_CASE_REQUIRED_MESSAGE =
  '"toCase" query param is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const CASE_NOT_SUPPORTED_MESSAGE =
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, ' +
  'PASCAL, UPPER.';

function createServer() {
  return http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const textToConvert = path.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: TEXT_REQUIRED_MESSAGE,
      });
    }

    if (!toCase) {
      errors.push({
        message: TO_CASE_REQUIRED_MESSAGE,
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message: CASE_NOT_SUPPORTED_MESSAGE,
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
