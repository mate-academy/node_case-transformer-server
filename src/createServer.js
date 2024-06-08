const http = require('http');
const { convertToCase } = require('./convertToCase');
const PORT = process.env.PORT || 5701;


function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const pathName = normalizedUrl.pathname.slice(1);
    const caseName = normalizedUrl.searchParams.get('toCase');

    const errors = [];

    if (!pathName) {
      errors.push({
        message:
          'Text to convert is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseName) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (caseName && !validCases.includes(caseName.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(pathName, caseName);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: caseName,
        originalText: pathName,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
