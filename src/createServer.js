/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [path, queryString] = req.url.split('?');
    const pathSegments = path.split('/').filter(Boolean);

    const textToConvert = pathSegments[0];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (pathSegments.length !== 1 || !textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors }));
    }

    const convertedText = convertToCase(textToConvert, toCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        ...convertedText,
        originalText: textToConvert,
        targetCase: toCase,
      }),
    );
  });
};

module.exports = { createServer };
