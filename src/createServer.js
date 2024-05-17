const http = require('http');
const { convertToCase } = require('./convertToCase');
const { detectCase } = require('./convertToCase/detectCase');

const PORT = process.env.PORT || 1595;

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const originalText = decodeURIComponent(normalizedUrl.pathname.slice(1));
    const originalCase = detectCase(originalText);
    const toCase = normalizedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const handleError = (message) => {
      const error = { message };

      errors.push(error);
    };

    if (!originalText) {
      const errorMessage =
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

      handleError(errorMessage);
    }

    if (toCase && !cases.includes(toCase)) {
      const errorMessage =
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

      handleError(errorMessage);
    }

    if (!toCase) {
      const errorMessage =
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

      handleError(errorMessage);
    }

    if (errors.length) {
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(originalText, toCase);

    const result = {
      originalCase,
      targetCase: toCase,
      originalText: originalText,
    };

    const ress = Object.assign(result, convertedText);

    res.end(JSON.stringify(ress));
  });
};

module.exports = {
  createServer,
};
