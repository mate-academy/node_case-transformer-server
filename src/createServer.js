const { createServer: createHttpServer } = require('node:http');
const { convertToCase } = require('./convertToCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function getValidationErrors(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !supportedCases.includes(toCase)) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

function createServer() {
  return createHttpServer((req, res) => {
    const requestUrl = new URL(req.url || '/', 'http://localhost');
    const text = requestUrl.pathname.slice(1);
    const toCase = requestUrl.searchParams.get('toCase');
    const errors = getValidationErrors(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
