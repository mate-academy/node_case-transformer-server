/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const error = [];

    const [path, querySting] = req.url.split('?');

    const text = path.slice(1);

    if (!text) {
      error.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const params = new URLSearchParams(querySting);
    const toCase = params.get('toCase');

    const caseName = toCase ? toCase.toUpperCase() : null;

    if (!toCase) {
      error.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(caseName)) {
      error.push({
        message:
          'This case is not supported. Available cases: ' +
          SUPPORTED_CASES.join(', ') +
          '.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (error.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors: error }, null, 2));

      return;
    }

    const result = convertToCase(text, caseName);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify(
        {
          originalCase: result.originalCase,
          targetCase: caseName,
          originalText: text,
          convertedText: result.convertedText,
        },
        null,
        2,
      ),
    );
  });

  return server;
}

module.exports = { createServer };
