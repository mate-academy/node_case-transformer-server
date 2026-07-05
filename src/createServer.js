const http = require('http');
const { convertToCase } = require('./convertToCase/');

const acceptedCases = [`SNAKE`, `KEBAB`, `CAMEL`, `PASCAL`, `UPPER`];

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    if (
      originalText === '' ||
      !targetCase ||
      (targetCase && !acceptedCases.includes(targetCase))
    ) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      const errorPayload = {
        errors: [],
      };

      if (originalText === '') {
        errorPayload.errors.push({
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      if (!targetCase) {
        errorPayload.errors.push({
          message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      if (targetCase && !acceptedCases.includes(targetCase)) {
        errorPayload.errors.push({
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        });
      }

      res.end(JSON.stringify(errorPayload));

      return;
    }

    const { convertedText, originalCase } = convertToCase(
      originalText,
      targetCase,
    );

    const result = {
      originalCase: originalCase,
      targetCase: targetCase,
      originalText: originalText,
      convertedText: convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
