const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    const errorMessage = {
      targetCaseNotExists: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      targetCaseNotCorrect: 'This case is not supported. '
      + `Available cases: ${cases.join(', ')}.`,
      originalTextNotExists: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };

    if (!targetCase || targetCase === '') {
      errors.push({ message: errorMessage.targetCaseNotExists });
    } else if (!(cases.includes(targetCase))) {
      errors.push({ message: errorMessage.targetCaseNotCorrect });
    };

    if (!originalText || originalText === '') {
      errors.push({ message: errorMessage.originalTextNotExists });
    };

    res.setHeader('Content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
