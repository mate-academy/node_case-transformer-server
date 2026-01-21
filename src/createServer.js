const http = require('http');
const { convertToCase } = require('./convertToCase'); // Импорт бизнес-логики

function createServer() {
  return http.createServer((req, resp) => {
    resp.setHeader('Content-Type', 'application/json');

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const queryParams = parsedUrl.searchParams;

    const textToConvert = parsedUrl.pathname.slice(1);
    const targetCase = queryParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (targetCase && !validCases.includes(targetCase)) {
      errors.push({
        message: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
      });
    }

    if (errors.length > 0) {
      resp.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(textToConvert, targetCase);

      resp.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase,
          originalText: textToConvert,
          convertedText: result.convertedText,
        }),
      );
    } catch (error) {
      resp.end(JSON.stringify({ error: error.message }));
    }
  });
}

module.exports = { createServer };
