const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const VALID_TARGET_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const MSG_TEXT_REQUIRED =
  'Text to convert is required. Correct request' +
  ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const MSG_TOCASE_REQUIRED =
  '"toCase" query param is required. Correct request' +
  ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const MSG_UNSUPPORTED =
  'This case is not supported. Available cases:' +
  ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const createServer = () => {
  const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' });
      res.end();

      return;
    }

    const [path, queryString] = req.url.split('?');
    const originalText = path.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = [];

    if (!originalText) {
      errors.push({
        message: MSG_TEXT_REQUIRED,
      });
    }

    if (!toCase) {
      errors.push({ message: MSG_TOCASE_REQUIRED });
    } else {
      if (!VALID_TARGET_CASES.includes(toCase)) {
        errors.push({ message: MSG_UNSUPPORTED });
      }
    }

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const transformText = convertToCase(toCase, originalText);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: transformText.originalCase,
        targetCase: toCase,
        originalText: originalText,
        convertedText: transformText.convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
