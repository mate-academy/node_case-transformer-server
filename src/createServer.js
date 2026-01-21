/* eslint-disable max-len */
const http = require('http');
const { detectCase } = require('./convertToCase/detectCase.js');
const { toWords } = require('./convertToCase/toWords.js');
const { wordsToCase } = require('./convertToCase/wordsToCase.js');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const text = decodeURIComponent(path.slice(1));
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase')?.toUpperCase();

    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.writeHead(400, 'Bad Request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const originalCase = detectCase(text);
      const words = toWords(text, originalCase);
      const convertedText = wordsToCase(words, toCase);

      res.writeHead(200, 'OK');

      res.end(
        JSON.stringify({
          originalCase,
          targetCase: toCase,
          originalText: text,
          convertedText,
        }),
      );
    } catch (err) {
      res.writeHead(500, 'Internal Server Error');

      res.end(
        JSON.stringify({
          error: 'Failed to convert case',
          details: err.message,
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer };
