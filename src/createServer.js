const http = require('http');
const { normalizeUrl } = require('./utils/normalizeUrl');
const { getErrors } = require('./utils/getErrors');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [textToFormat, caseToFormat] = normalizeUrl(req);
    const errors = getErrors(textToFormat, caseToFormat);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          errors: errors.map((error) => ({ message: error })),
        }),
      );
    }

    const { originalCase, convertedText } = convertToCase(
      textToFormat,
      caseToFormat,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        convertedText,
        targetCase: caseToFormat,
        originalText: textToFormat,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
