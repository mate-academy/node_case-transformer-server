const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const urlArr = req.url.split('?');
    const queryObject = new URLSearchParams(urlArr[1]);
    const textToConvert = urlArr[0].slice(1);
    const caseName = queryObject.get('toCase');

    const HTTP_OK = 200;
    const HTTP_BAD_REQUEST = 400;

    const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const REQUIRED_TEXT_MESSAGE =
      'Text to convert is required. Correct request is: ' +
      '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const REQUIRED_CASE_MESSAGE =
      '"toCase" query param is required. Correct request is: ' +
      '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const UNSUPPORTED_CASE_MESSAGE =
      'This case is not supported. Available cases: ' +
      'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: REQUIRED_TEXT_MESSAGE,
      });
    }

    if (!caseName) {
      errors.push({
        message: REQUIRED_CASE_MESSAGE,
      });
    } else if (!SUPPORTED_CASES.includes(caseName)) {
      errors.push({
        message: UNSUPPORTED_CASE_MESSAGE,
      });
    }

    if (errors.length > 0) {
      res.writeHead(HTTP_BAD_REQUEST, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const convertedText = convertToCase(textToConvert, caseName);

      res.writeHead(HTTP_OK, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase: convertedText.originalCase,
          targetCase: caseName,
          originalText: textToConvert,
          convertedText: convertedText.convertedText,
        }),
      );
    } catch (error) {
      res.writeHead(HTTP_BAD_REQUEST, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
};

module.exports = { createServer };
