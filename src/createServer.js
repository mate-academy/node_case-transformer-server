const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const availableCases = ['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'];

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const targetCase = url.searchParams.get('toCase');
    const originalText = url.pathname.slice(1);

    const response = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {},
    };

    const errors = [];

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !availableCases.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.status = 400;
      response.body = { errors };
    } else {
      response.body = {
        targetCase,
        originalText,
        ...convertToCase(originalText, targetCase),
      };
    }

    res
      .writeHead(response.status, response.headers)
      .end(JSON.stringify(response.body));
  });
}

module.exports = { createServer };
