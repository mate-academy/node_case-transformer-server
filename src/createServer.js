/* eslint-disable max-len */

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
  const server = html.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const allCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const params = req.url.split('?');
    const isText = params[0] === '/';
    const text = !isText && params[0].slice(1);
    const queryString = params[1];
    const newSearchParams = new URLSearchParams(queryString);
    const toCase = newSearchParams.get('toCase');
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
