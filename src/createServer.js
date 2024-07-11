const http = require('http');
const { convertToCase } = require('./convertToCase');
const {
  SUPPORTED_CASES,
  STATUS_CODES,
  ERROR_MESSAGES,
} = require('./constants');

function createServer() {
  return http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');

    const textToConvert = path.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: ERROR_MESSAGES.TEXT_REQUIRED });
    }

    if (!toCase) {
      errors.push({ message: ERROR_MESSAGES.CASE_REQUIRED });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({ message: ERROR_MESSAGES.CASE_NOT_SUPPORTED });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.writeHead(STATUS_CODES.BAD_REQUEST);
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.writeHead(STATUS_CODES.OK);

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
