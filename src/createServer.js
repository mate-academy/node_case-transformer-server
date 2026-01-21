const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const query = Object.fromEntries(url.searchParams.entries());
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const targetCase = query.toCase;

    const errorNotification = {
      noText: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      noParam: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      noCase: 'This case is not supported. '
      + `Available cases: ${cases.join(', ')}.`,
    };

    res.setHeader('Content-type', 'application/json');

    const errors = [];

    if (!originalText) {
      errors.push({ message: errorNotification.noText });
    };

    if (!targetCase) {
      errors.push({
        message: errorNotification.noParam,
      });
    } else if (!(cases.includes(targetCase))) {
      errors.push({
        message: errorNotification.noCase,
      });
    };

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalText,
      convertedText,
      originalCase,
      targetCase,
    }));
  });
};

module.exports = { createServer };
