const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json');

    const [url, params] = req.url.split('?');
    const errors = [];
    const textForConvertion = url.slice(1);
    const toCase = params ? new URLSearchParams(params).get('toCase') : null;

    if (!textForConvertion) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (
      toCase &&
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(`{"errors": ${JSON.stringify(errors)}}`);

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textForConvertion,
      toCase,
    );
    const responseObj = {
      originalCase: originalCase,
      targetCase: toCase,
      originalText: textForConvertion,
      convertedText: convertedText,
    };

    res.statusCode = 200;

    res.end(JSON.stringify(responseObj));
  });
}

module.exports = { createServer };
