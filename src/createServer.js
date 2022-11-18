const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const toCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);

    const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errorsMessages = [];
    let result = { errors: [] };

    if (!textToConvert) {
      errorsMessages.push({ message: 'Text to convert is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (toCase === null) {
      errorsMessages.push({ message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!CASES.includes(toCase) && toCase !== null) {
      errorsMessages.push({ message: 'This case is not supported.'
      + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errorsMessages.length > 0) {
      result.errors = errorsMessages;
      res.statusCode = 400;
    } else {
      const {
        convertedText,
        originalCase,
      } = convertToCase(textToConvert, toCase);

      result = {
        convertedText,
        originalCase,
        originalText: textToConvert,
        targetCase: toCase,
      };
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });

  return server;
};

module.exports = { createServer };
