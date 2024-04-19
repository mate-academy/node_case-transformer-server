const http = require('http');
const { convertToCase } = require('./convertToCase');

const supportedCases = {
  SNAKE: true,
  KEBAB: true,
  CAMEL: true,
  PASCAL: true,
  UPPER: true,
};

const possibleErrors = {
  text:
    'Text to convert is required. ' +
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase:
    '"toCase" query param is required. ' +
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notValidCase:
    'This case is not supported. ' +
    'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new URL(
      req.url,
      `http://${req.headers.host}`,
    );
    const text = pathname.slice(1);
    const caseName = searchParams.get('toCase');

    if (!text || !caseName || !supportedCases[caseName]) {
      res.statusCode = 404;
      res.statusMessage = 'Bad request';

      const errorObject = { errors: [] };

      if (!text) {
        errorObject.errors.push({ message: possibleErrors.text });
      }

      if (!caseName) {
        errorObject.errors.push({ message: possibleErrors.noCase });
      } else if (!supportedCases[caseName]) {
        errorObject.errors.push({ message: possibleErrors.notValidCase });
      }

      res.end(JSON.stringify(errorObject));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'Ok';

      res.end(
        JSON.stringify({
          targetCase: caseName,
          originalText: text,
          ...convertToCase(text, caseName),
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer };
