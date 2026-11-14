const { createServer: server } = require('http');
const { convertToCase } = require('./convertToCase');

const CaseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return server((req, res) => {
    const [pathname, queryString] = req.url.split('?');
    const text = pathname.slice(1);
    const toCase = new URLSearchParams(queryString).get('toCase');
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !CaseName.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases:' +
          ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);
    const response = {
      originalCase: originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: convertedText,
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });
}

module.exports = {
  createServer,
};
