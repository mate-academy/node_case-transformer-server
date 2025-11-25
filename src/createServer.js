const http = require('http');
const { convertToCase } = require('./convertToCase');
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [str, queryString] = req.url.split('?');
    const toCase = new URLSearchParams(queryString).get('toCase');

    const validation = {
      errors: [],
    };

    try {
      const text = str.slice(1);

      if (!text) {
        validation.errors.push({
          message:
            'Text to convert is required.' +
            ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!toCase) {
        validation.errors.push({
          message:
            '"toCase" query param is required.' +
            ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!cases.includes(toCase)) {
        validation.errors.push({
          message:
            'This case is not supported.' +
            ' Available cases: SNAKE, KEBAB, ' +
            'CAMEL, PASCAL, UPPER.',
        });
      }

      if (validation.errors.length > 0) {
        res.statusCode = 400;
        res.end(JSON.stringify(validation));

        return;
      }

      const result = convertToCase(text, toCase);

      res.statusCode = 200;

      res.end(
        JSON.stringify({ ...result, originalText: text, targetCase: toCase }),
      );
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });

  return server;
}

module.exports = { createServer };
