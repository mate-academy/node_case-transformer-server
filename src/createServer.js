const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const [originalText, splitedURL] = req.url.slice(1).split('?');
    const targetCase = new URLSearchParams(splitedURL).get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!targetCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (
      targetCase &&
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(
        targetCase.toUpperCase(),
      )
    ) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
  return server;
}

module.exports = { createServer };
