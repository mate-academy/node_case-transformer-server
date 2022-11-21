const http = require('http');
const { convertToCase } = require('./convertToCase');
const { detectCase } = require('./convertToCase/detectCase');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const targetCase = normalizedUrl.searchParams.get('toCase');
    const originalText = normalizedUrl.pathname.slice(1);

    const errors = [];
    const validCases = ['UPPER', 'SNAKE', 'KEBAB', 'PASCAL', 'CAMEL'];

    if (!targetCase) {
      errors.push('"toCase" query param is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
    } else if (!validCases.includes(targetCase)) {
      errors.push('This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
    }

    if (!originalText) {
      errors.push('Text to convert is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length !== 0) {
      const resp = {
        errors: [],
      };

      errors.forEach(error => {
        resp.errors.push({ message: error });
      });

      res.end(JSON.stringify(resp));

      return;
    }

    const response = {
      originalCase: detectCase(originalText),
      targetCase,
      originalText,
      convertedText: '',
    };

    response.convertedText = convertToCase(originalText, targetCase)
      .convertedText;

    res.end(JSON.stringify(response));
  });
}

module.exports.createServer = createServer;

