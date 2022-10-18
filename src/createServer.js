const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedURl.pathname.replace('/', '');

    const toCase = normalizedURl.searchParams.get('toCase');

    const response = {};

    const errors = [];

    const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const noTextToConvertMessage = 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const emptyCaseMessage = '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const invalidCaseMessage = 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    if (!textToConvert) {
      errors.push({
        message: noTextToConvertMessage,
      });
    }

    if (!toCase) {
      errors.push({
        message: emptyCaseMessage,
      });
    } else if (!allowedCases.includes(toCase)) {
      errors.push({
        message: invalidCaseMessage,
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;

      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;

      response.originalCase = convertToCase(textToConvert, toCase).originalCase;

      response.targetCase = toCase;

      response.originalText = textToConvert;

      response.convertedText = convertToCase(textToConvert, toCase)
        .convertedText;

      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = { createServer };
