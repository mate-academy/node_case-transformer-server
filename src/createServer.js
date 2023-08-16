/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const errorsObj = {
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  wrongToCaseOption: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const createServer = function () {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const caseName = normalizedUrl.searchParams.get('toCase');

    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: errorsObj.noText,
      });
    }

    if (!caseName) {
      errors.push({
        message: errorsObj.noToCase,
      });
    }

    if (caseName && !cases.includes(caseName)) {
      errors.push({
        message: errorsObj.wrongToCaseOption,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad ewquest';
      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      const consverted = convertToCase(textToConvert, caseName);

      const result = {
        targetCase: caseName,
        originalText: textToConvert,
        ...consverted,
      };

      res.end(JSON.stringify(result));
    }
  });

  return server;
};

module.exports = { createServer };
