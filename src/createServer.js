const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const USAGE = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const MESSAGES = {
  textRequired: `Text to convert is required. ${USAGE}`,
  toCaseRequired: `"toCase" query param is required. ${USAGE}`,
  caseNotSupported: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
};

function createServer() {
  return http.createServer((req, res) => {
    const [pathPart, queryString] = req.url.split('?');
    const originalText = pathPart.slice(1);
    const toCase = new URLSearchParams(queryString).get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({ message: MESSAGES.textRequired });
    }

    if (!toCase) {
      errors.push({ message: MESSAGES.toCaseRequired });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({ message: MESSAGES.caseNotSupported });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText,
        convertedText,
      }),
    );
  });
}

module.exports = { createServer };
