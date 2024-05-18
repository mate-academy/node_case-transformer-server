const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    try {
      const myURL = new URL(req.url, `http://${req.headers.host}`);
      const pathname = myURL.pathname.slice(1);
      const toCase = myURL.searchParams.get('toCase');

      const errors = [];

      if (!pathname) {
        errors.push({
          message:
            // eslint-disable-next-line max-len
            'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!toCase) {
        errors.push({
          message:
            // eslint-disable-next-line max-len
            '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

      if (toCase && !supportedCases.includes(toCase)) {
        errors.push({
          message:
            // eslint-disable-next-line max-len
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      if (errors.length > 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ errors }));

        return;
      }

      const result = convertToCase(pathname, toCase);

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: toCase,
          originalText: pathname,
          convertedText: result.convertedText,
        }),
      );
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: [{ message: err.message }] }));
    }
  });
}

module.exports = { createServer };
