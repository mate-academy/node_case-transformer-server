const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const getDataToFormat = require('./utils/getDataToFormat');
const validate = require('./utils/validate');

function createServer() {
  const server = http.createServer((req, res) => {
    const [textToFormat, caseToFormat] = getDataToFormat(req);

    const errors = validate(textToFormat, caseToFormat);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          errors: errors.map((error) => ({ message: error })),
        })
      );
    }

    const { originalCase, convertedText } = convertToCase(
      textToFormat,
      caseToFormat
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        convertedText,
        targetCase: caseToFormat,
        originalText: textToFormat,
      })
    );
  });

  return server;
}

module.exports = { createServer };
