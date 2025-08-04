import http from 'http';
import convertToCase from './convertToCase.js';

function createServer() {
  const server = http.createServer((req, res) => {
    const normalUrl = new URL(req.url, 'http://localhost');
    const toCaseType = normalUrl.searchParams.get('toCase');
    const textToConvert = normalUrl.pathname.slice(1);
    const allTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!toCaseType) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!allTypes.includes(toCaseType)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
      return;
    }

    const result = convertToCase(toCaseType, textToConvert);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        ...result,
        targetCase: toCaseType,
        originalText: textToConvert,
      }),
    );
  });

  return server;
}

export { createServer };
