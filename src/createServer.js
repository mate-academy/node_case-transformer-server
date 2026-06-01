const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const CORRECT_REQUEST_HINT =
  'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const ERROR_MESSAGES = {
  NO_TEXT: `Text to convert is required. ${CORRECT_REQUEST_HINT}`,
  NO_CASE: `"toCase" query param is required. ${CORRECT_REQUEST_HINT}`,
  INVALID_CASE: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
};

function createServer() {
  return http.createServer((req, res) => {
    const [pathname, queryString] = req.url.split('?');
    const text = pathname.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({
        message: `${ERROR_MESSAGES.NO_TEXT}`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `${ERROR_MESSAGES.NO_CASE}`,
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message: `${ERROR_MESSAGES.INVALID_CASE}`,
      });
    }

    res.setHeader('content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
