const http = require('http');
const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const STATUS_CODE = {
  OK: 200,
  ERROR: 400,
};

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParts = req.url.slice(1).split('?');
    const pathToConvert = urlParts[0];
    const toCase = new URLSearchParams(urlParts[1]).get('toCase');

    const errors = [];

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!pathToConvert) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (toCase && !CASES.includes(toCase.toUpperCase())) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = STATUS_CODE.ERROR;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      pathToConvert,
      toCase,
    );

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = STATUS_CODE.OK;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: pathToConvert,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
