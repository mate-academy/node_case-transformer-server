/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    const [path, query] = req.url.split('?');
    const text = path.slice(1);
    const urlParams = new URLSearchParams(query);
    const caseName = urlParams.get('toCase');
    const errors = [];

    if (!text) {
      errors.push(
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!caseName) {
      errors.push(
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (caseName && !SUPPORTED_CASES.includes(caseName)) {
      errors.push(
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors: errors.map((m) => ({ message: m })) }));

      return;
    }

    const result = convertToCase(text, caseName);

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        convertedText: result.convertedText,
        targetCase: caseName,
        originalText: text,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
