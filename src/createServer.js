const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlRequest = req.url.slice(1)?.split('?') || [];
    const [originalText, paramString] = urlRequest;
    const targetCase = new URLSearchParams(paramString).get('toCase') || null;
    const validCaseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errorResponse = [];

    // #region Validation

    if (!originalText) {
      errorResponse.push(
        'Text to convert is required.' +
          ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!targetCase) {
      errorResponse.push(
        '"toCase" query param is required.' +
          ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (targetCase && !validCaseTypes.includes(targetCase)) {
      errorResponse.push(
        'This case is not supported.' +
          ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }
    // #endregion Validation

    if (errorResponse.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify(
          {
            errors: errorResponse.map((error) => ({ message: error })),
          },
          null,
          2,
        ),
      );

      return;
    }

    const result = convertToCase(originalText, targetCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ...result, originalText, targetCase }, null, 2));
  });

  return server;
}

module.exports = { createServer };
