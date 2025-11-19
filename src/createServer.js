const http = require('http');
const convertToCase = require('./convertToCase').convertToCase;

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    const [requestedPath, queryString] = (req.url || '').split('?');
    const rawPath = (requestedPath || '').slice(1);
    let decodedOriginalText = '';

    try {
      decodedOriginalText = decodeURIComponent(rawPath);
    } catch (e) {
      decodedOriginalText = rawPath;
    }

    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');

    if (!decodedOriginalText) {
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




    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        convertedText: result.convertedText,
        originalCase: result.originalCase,
        originalText: decodedOriginalText,
        targetCase: toCase,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
