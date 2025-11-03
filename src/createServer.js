const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    try {
      const errors = [];

      const url = req.url || '/';
      const [path, query] = url.split('?');

      let text = '';

      try {
        text = decodeURIComponent(path.slice(1));
      } catch {
        text = '';
      }

      const params = new URLSearchParams(query);
      const toCase = params.get('toCase');

      if (!text || text.trim() === '') {
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

      res.setHeader('Content-Type', 'application/json');

      if (errors.length > 0) {
        res.statusCode = 400;
        res.statusMessage = 'Bad request';
        res.end(JSON.stringify({ errors }));

        return;
      }

      const result = convertToCase(toCase, text);

      const responseBody = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(responseBody));
    } catch (err) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [{ message: err.message }],
        }),
      );
    }
  });
}

module.exports = { createServer };
