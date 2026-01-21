const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = parsedUrl.pathname.slice(1);
    const toCase = parsedUrl.searchParams?.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (toCase && !SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    const fullResponse = {
      targetCase: toCase,
      originalText: textToConvert,
      ...result,
    };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(fullResponse));
  });

  return server;
}

module.exports = { createServer };
