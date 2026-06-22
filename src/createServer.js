const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  return http.createServer((req, res) => {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = url.searchParams.get('toCase') || null;
    const originalText = url.pathname.slice(1);

    const errors = [];

    if (!originalText || (originalText && originalText.trim().length === 0)) {
      errors.push(
        // eslint-disable-next-line max-len
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!targetCase || (targetCase && targetCase.trim().length === 0)) {
      errors.push(
        // eslint-disable-next-line max-len
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (
      targetCase &&
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)
    ) {
      errors.push(
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (errors.length !== 0) {
      const finalErrors = errors.map((error) => ({ message: error }));

      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors: finalErrors }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const converted = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({ ...converted, targetCase, originalText }));
  });
}

module.exports = { createServer };
