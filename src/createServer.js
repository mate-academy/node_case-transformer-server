const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase');

const MISSING_TEXT =
  // eslint-disable-next-line max-len
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const MISSING_CASE =
  // eslint-disable-next-line max-len
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const UNSUPPORTED_CASE =
  // eslint-disable-next-line max-len
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new url.URL(
      req.url,
      'http://localhost:5700',
    );

    const originalText = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    if (!originalText || !toCase || !SUPPORTED_CASES.includes(toCase)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      const body = {
        errors: [],
      };

      if (!originalText) {
        body.errors.push({
          message: MISSING_TEXT,
        });
      }

      if (!toCase) {
        body.errors.push({
          message: MISSING_CASE,
        });
      } else if (!SUPPORTED_CASES.includes(toCase)) {
        body.errors.push({
          message: UNSUPPORTED_CASE,
        });
      }

      return res.end(JSON.stringify(body));
    }

    const { originalCase, convertedText } = convertToCase(originalText, toCase);

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        convertedText,
        originalText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
