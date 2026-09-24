const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const TEXT_ERR_MSG =
  'Text to convert is required. ' +
  'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const CASE_ERR_MSG =
  '"toCase" query param is required. ' +
  'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const UNSUPPORTED_ERR_MSG =
  'This case is not supported. ' +
  'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const createServer = () => {
  return http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = decodeURIComponent(parsedUrl.pathname.slice(1));
    const toCase = parsedUrl.searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: TEXT_ERR_MSG });
    }

    if (!toCase) {
      errors.push({ message: CASE_ERR_MSG });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({ message: UNSUPPORTED_ERR_MSG });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.writeHead(400, 'Bad Request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        toCase,
      );

      const responseBody = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };

      res.writeHead(200, 'OK');
      res.end(JSON.stringify(responseBody));
    } catch (error) {
      res.writeHead(500, 'Internal Server Error');
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });
};

module.exports = { createServer };
