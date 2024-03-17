/* eslint-disable max-len */
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { detectCase } = require('./convertToCase/detectCase.js');

function createServer() {
  const http = require('http');

  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const originalText = normalizedUrl.pathname.slice(1);
    const originalCase = detectCase(originalText);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = valitateArgs(originalText, targetCase);

    if (errors) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { convertedText } = convertToCase(originalText, targetCase);
    const clientResponse = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.writeHead(200, 'ok', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(clientResponse));
  });
}

function valitateArgs(textToConvert, targetCase) {
  const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!CASES.includes(targetCase)) {
    errors.push({
      message:
        'This case is not supported. ' +
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length) {
    return errors;
  }

  return null;
}

module.exports = {
  createServer,
};
