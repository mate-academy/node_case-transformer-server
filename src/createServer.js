const http = require('http');
const { convertToCase } = require('./convertToCase');
const { sendBadRequest } = require('./sendBadRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    const [textToConvert, queryToCase] = req.url.slice(1).split('?');
    const searchParams = new URLSearchParams(queryToCase);
    const toCase = searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push(
        // eslint-disable-next-line max-len
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!toCase) {
      // eslint-disable-next-line max-len
      errors.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !supportedCases.includes(toCase.toUpperCase())) {
      errors.push(
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (errors.length > 0) {
      return sendBadRequest(res, errors);
    }

    const result = convertToCase(textToConvert, toCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
