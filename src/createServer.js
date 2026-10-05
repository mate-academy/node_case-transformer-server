const http = require('http');
const { convertToCase } = require('./convertToCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const correctRequest = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';

function createServer() {
  return http.createServer((req, res) => {
    const [pathname, queryString] = req.url.split('?');
    const originalText = pathname.slice(1);
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. ' +
          `Correct request is: "${correctRequest}".`,
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          `Correct request is: "${correctRequest}".`,
      });
    } else if (!supportedCases.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          `Available cases: ${supportedCases.join(', ')}.`,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.writeHead(200, 'OK');

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
