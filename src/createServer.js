const http = require('http');
const convertToCase = require('./convertToCase').convertToCase;

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    const [requestedPath, queryString] = req.url.split('?');
    const requestValue = requestedPath?.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    if (requestValue === '') {
      const message = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

      errors.push({
        message,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request'
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(requestValue, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK'

    res.end(
      JSON.stringify({
        convertedText: result.convertedText,
        originalCase: result.originalCase,
        originalText: requestValue,
        targetCase: toCase,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer
};
