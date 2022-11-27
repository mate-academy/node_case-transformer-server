const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const convertCases = [
      'SNAKE',
      'KEBAB',
      'CAMEL',
      'PASCAL',
      'UPPER',
    ];

    const errors = [];
    const response = {};

    const textToConvert = normalizedUrl.pathname.slice(1);
    const params = Object.fromEntries(normalizedUrl.searchParams.entries());

    if (textToConvert.length === 0) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (Object.keys(params).length === 0) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!convertCases.includes(params.toCase)) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.errors = errors;
    } else {
      const result = convertToCase(textToConvert, params.toCase);

      response.originalCase = result.originalCase;
      response.targetCase = params.toCase;
      response.originalText = textToConvert;
      response.convertedText = result.convertedText;
    }

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
