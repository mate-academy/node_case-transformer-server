const http = require('http');
const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      const [path, queryString] = req.url.split('?');
      const rawText = path.slice(1);
      const text = decodeURIComponent(rawText).trim();

      const params = new URLSearchParams(queryString || '');
      const toCase = params.get('toCase');

      const errors = [];

      if (!text) {
        errors.push({
          message:
            'Text to convert is required. Correct request ' +
            'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!toCase) {
        errors.push({
          message:
            '"toCase" query param is required. Correct request ' +
            'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!CASES.includes(toCase)) {
        errors.push({
          message:
            'This case is not supported. Available cases: ' +
            'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      if (errors.length) {
        res.statusCode = 400;
        res.statusMessage = 'Bad request';
        res.end(JSON.stringify({ errors }, null, 2));
        return;
      }

      const result = convertToCase(text, toCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(
        JSON.stringify(
          {
            originalCase: result.originalCase,
            targetCase: toCase,
            originalText: text,
            convertedText: result.convertedText,
          },
          null,
          2
        )
      );
    } catch (err) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';
      res.end(JSON.stringify({ errors: [{ message: err.message }] }, null, 2));
    }
  });
}

module.exports = { createServer };
