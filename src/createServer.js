// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const ALLOWED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    const [pathname, queryString = ''] = req.url.split('?');
    const textToConvert = pathname.slice(1); // removing leading slash

    if (!textToConvert) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!queryString) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    const params = new URLSearchParams(queryString);
    const toCaseValue = params.get('toCase');

    if (toCaseValue && !ALLOWED_CASES.includes(toCaseValue)) {
      errors.push({
        message: `This case is not supported. Available cases: ${ALLOWED_CASES.join(', ')}.`,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCaseValue,
    );

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCaseValue,
        originalText: textToConvert,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
