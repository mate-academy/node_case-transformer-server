const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => (http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
  const toCase = Object.fromEntries(normalizedUrl.searchParams.entries())
    .toCase;
  const path = normalizedUrl.pathname.slice(1);
  const errors = [];

  if (!path) {
    addError(errors, 'Text to convert is required. Correct request'
      + ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (toCase
      && !['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'].includes(toCase)) {
    addError(errors, 'This case is not supported.'
      + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
  }

  if (!toCase) {
    addError(errors, '"toCase" query param is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (errors.length) {
    res.statusCode = 400;
    res.statusMessage = 'Bad request';
    res.end(JSON.stringify({ errors }));

    return;
  }

  res.statusCode = 200;
  res.statusMessage = 'OK';

  const { originalCase, convertedText } = convertToCase(path
    , toCase);

  res.end(JSON.stringify({
    originalCase,
    targetCase: toCase,
    originalText: path,
    convertedText,
  }));
}));

function addError(errors, errorMsg) {
  errors.push({ message: errorMsg });
}

module.exports = { createServer };
