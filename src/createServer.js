const http = require('http');
const { convertToCase } = require('./convertToCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const textRequiredMessage =
  'Text to convert is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const toCaseRequiredMessage =
  '"toCase" query param is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const unsupportedCaseMessage =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const text = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message: textRequiredMessage,
      });
    }

    if (!targetCase) {
      errors.push({
        message: toCaseRequiredMessage,
      });
    }

    if (targetCase && !supportedCases.includes(targetCase)) {
      errors.push({
        message: unsupportedCaseMessage,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
