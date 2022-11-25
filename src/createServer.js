const http = require('http');
const { convertToCase } = require('./convertToCase');

const errorsTypes = {
  notOriginalText: 'Text to convert is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notTargetCase: '"toCase" query param is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  wrongTargetCase: 'This case is not supported.'
  + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normaliseUrl = new URL(req.url, `http://${req.headers.host}`);
    const { pathname, searchParams } = normaliseUrl;
    const originalText = pathname.slice(1);
    const params = new URLSearchParams(searchParams);
    const targetCase = params.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];
    const { notOriginalText, notTargetCase, wrongTargetCase } = errorsTypes;

    if (!originalText) {
      errors.push({
        message: notOriginalText,
      });
    }

    if (!targetCase) {
      errors.push({
        message: notTargetCase,
      });
    }

    if (!cases.includes(targetCase) && targetCase) {
      errors.push({
        message: wrongTargetCase,
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
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

module.exports = { createServer }
