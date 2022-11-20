const http = require('http');
const { convertToCase } = require('./convertToCase');
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizeUrl = new URL(req.url, `https://${req.headers.host}`);

    let response = {};
    const errors = [];

    const textToConvert = normalizeUrl.pathname.slice(1);
    const toCase = normalizeUrl.searchParams.get('toCase');

    if (textToConvert.length === 0) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableCases.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.errors = errors;
      res.statusCode = 404;
      res.statusText = 'Bad request';
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textToConvert, toCase);

      response = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };
    }

    res.setHeader('Content-type', 'application/json');

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = {
  createServer,
};
