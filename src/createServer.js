const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');

const PORT = process.env.PORT || 5700;
const baseUrl = `http://localhost:${PORT}`;

const ERROR_MESSAGES = {
  MISSING_TEXT: {
    message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  },
  MISSING_TOCASE: {
    message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  },
  INVALID_CASE: {
    message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
  },
};

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, baseUrl);
    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!text) {
      errors.push(ERROR_MESSAGES.MISSING_TEXT);
    }

    if (!toCase) {
      errors.push(ERROR_MESSAGES.MISSING_TOCASE);
    }

    if (toCase && !validCases.includes(toCase)) {
      errors.push(ERROR_MESSAGES.INVALID_CASE);
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(text, toCase);

      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: toCase,
          originalText: text,
          convertedText: result.convertedText,
        }),
      );
    } catch {
      res.statusCode = 500;

      res.end(
        JSON.stringify({
          errors: { message: 'An error occurred during processing.' },
        }),
      );
    }
  });
};

module.exports = {
  createServer,
};
