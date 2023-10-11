const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const validationErrors = [];

    if (!textToConvert) {
      validationErrors.push({
        message:
          'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      validationErrors.push({
        message:
          '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(targetCase)) {
      validationErrors.push({
        message:
          'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (validationErrors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: validationErrors }));
    } else {
      const convertedText = convertToCase(textToConvert, targetCase);

      const response = {
        originalCase: convertedText.originalCase,
        targetCase,
        originalText: textToConvert,
        convertedText: convertedText.convertedText,
      };

      res.statusCode = 200;

      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = { createServer };
