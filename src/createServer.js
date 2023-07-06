const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const originalText = normalizedURL.pathname.slice(1);
    const possibleErrors = validate(originalText, targetCase);

    if (possibleErrors.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(possibleErrors));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(result));
  });

  return server;
};

function validate(text, toCase) {
  const statusText = {
    errors: [],
  };

  if (!text) {
    statusText.errors.push({
      message:
        'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    statusText.errors.push({
      message:
        '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!(cases.includes(toCase)) && toCase) {
    statusText.errors.push({
      message: `This case is not supported. Available cases: ${cases.join(', ')}.`,
    });
  }

  return statusText;
}

module.exports = { createServer };
