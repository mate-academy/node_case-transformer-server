const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase');

const PORT = process.env.PORT || 3000;

function createServer() {
  const server = http.createServer((req, res) => {
    const parsedUrl = new url.URL(`http://localhost/:${PORT}${req.url}`);
    const path = parsedUrl.pathname;
    const parts = path.split('/:3000/');
    const text = parts[1];
    const toCase = parsedUrl.searchParams.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!text) {
      errors.push({ message:
        'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!toCase) {
      errors.push({ message:
        '"toCase" query param is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (toCase && !cases.includes(toCase.toUpperCase())) {
      errors.push({ message:
        'This case is not supported. Available cases: '
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length > 0) {
      handleError(res, 400, errors);

      return;
    }

    const result = convertToCase(text, toCase);

    handleSuccess(res, 200, {
      originalCase: result.originalCase,
      targetCase: toCase.toUpperCase(),
      originalText: text,
      convertedText: result.convertedText,
    });

    res.end();
  });

  return server;
}

function handleError(res, code, errorMessage) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ errors: errorMessage }));
}

function handleSuccess(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

module.exports = {
  createServer,
};

createServer();
