const http = require('http');
const { convertToCase } = require('./convertToCase');

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorTypes = {
  textIsMissing: 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseIsMissing: '"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseIsWrong: 'This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  const server = http.createServer((req, res) => {
    const normalisedUrl = new URL(
      req.url,
      `http://${req.headers.host}`,
    );

    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = normalisedUrl;
    const originalText = pathname.slice(1);
    const caseParams = new URLSearchParams(searchParams);
    const targetCase = caseParams.get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({
        message: errorTypes.textIsMissing,
      });
    }

    if (!targetCase) {
      errors.push({
        message: errorTypes.toCaseIsMissing,
      });
    } else if (!cases.includes(targetCase)) {
      errors.push({
        message: errorTypes.toCaseIsWrong,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
