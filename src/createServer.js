const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
// const { detectCase } = require('./convertToCase/detectCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, 'http://localhost:5700');
    const toCase = Object.fromEntries(normalizedURL.searchParams.entries());
    const textToConvert = req.url.split('?')[0].replace('/', '');
    const caseType = Object.values(toCase)[0];
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!caseType) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!availableCases.includes(caseType)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      return res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(textToConvert, caseType);

    result.targetCase = `${caseType}`;
    result.originalText = `${textToConvert}`;

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
