const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizeUrl = new URL(req.url, 'http://localhost:5700');
    const textToConvert = normalizeUrl.pathname.slice(1);
    const caseType = normalizeUrl.searchParams.get('toCase');
    const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!textToConvert || !caseType || !allowedCases.includes(caseType)) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      const error = { errors: [] };

      if (!textToConvert) {
        error.errors.push({
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      if (!caseType) {
        error.errors.push({
          message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      if (!allowedCases.includes(caseType) && caseType) {
        error.errors.push({
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        });
      }

      res.end(JSON.stringify(error));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      caseType,
      textToConvert,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: caseType,
        originalText: textToConvert,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
