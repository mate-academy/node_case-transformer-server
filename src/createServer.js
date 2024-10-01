/* eslint-disable no-console */

const possibleErrors = [
  {
    message:
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  {
    message:
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
  {
    message:
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
];

function specialErrors(...args) {
  const [a, b] = args;
  const filtered = possibleErrors.filter(
    (v) => (a && v.message.startsWith(a)) || (b && v.message.startsWith(b)),
  );

  return JSON.stringify({ errors: filtered });
}

const html = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = html.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const newSearchParams = new URL(req.url, `http://${req.headers.host}`);

    const allCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const isText = newSearchParams.pathname === '/';
    const text = !isText && newSearchParams.pathname.slice(1);
    const toCase = newSearchParams.searchParams.get('toCase');
    const isValidCase = allCases.includes(toCase);
    const isCase = !!toCase;

    if (req.url === '/') {
      res.end(
        specialErrors(
          'Text to convert is required.',
          '"toCase" query param is required.',
        ),
      );
    } else if (isText && isValidCase) {
      res.end(specialErrors('Text to convert is required.'));
    } else if (isText && !!toCase && !isValidCase) {
      res.end(
        specialErrors(
          'Text to convert is required.',
          'This case is not supported.',
        ),
      );
    } else if (!isCase) {
      res.end(specialErrors('"toCase" query param is required.'));
    } else if (!isValidCase) {
      res.end(specialErrors('This case is not supported.'));
    } else {
      const { originalCase, convertedText } = convertToCase(text, toCase);

      const result = {
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      };

      res.statusCode = 200;
      res.write(JSON.stringify(result));
      res.end();
    }
  });

  return server;
}
module.exports = { createServer };
