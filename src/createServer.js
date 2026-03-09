const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  return http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const textToConvert = path.slice(1);

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const conversionResult = convertToCase(textToConvert, toCase);

    res.writeHead(200, 'OK');

    res.end(
      JSON.stringify({
        originalCase: conversionResult.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: conversionResult.convertedText,
      }),
    );
  });
};

module.exports = { createServer };
