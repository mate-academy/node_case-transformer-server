const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    const [pathname, queryParams] = req.url.split('?');
    const text = pathname.slice(1);
    const params = new URLSearchParams(queryParams);
    const toCase = params.get('toCase');

    const errors = [];
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (text.length === 0) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase !== null && !supportedCases.includes(toCase)) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      const errorResponse = {
        errors,
      };

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const result = convertToCase(text, toCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const formattedResponse = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(formattedResponse));
  });

  return server;
}

module.exports = {
  createServer,
};
