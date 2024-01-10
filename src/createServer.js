const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const PORT = process.env.PORT || 3000;
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function sendSuccessResponse(res, result, targetCase, textToTransform) {
  const response = {
    originalCase: result.originalCase,
    targetCase,
    originalText: textToTransform,
    convertedText: result.convertedText,
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
}

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://localhost:${PORT}`);
    const textToTransform = normalizedURL.pathname.slice(1);
    const caseType = (normalizedURL.searchParams.get('toCase') || '').toUpperCase();

    const errors = [];

    if (!textToTransform) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseType) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!SUPPORTED_CASES.includes(caseType) && caseType) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    try {
      if (errors.length > 0) {
        throw errors;
      }

      const caseTypePrepared = caseType;
      const result = convertToCase(textToTransform, caseTypePrepared);

      sendSuccessResponse(res, result, caseTypePrepared, textToTransform);
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: error.map(err => ({ message: err.message })) }));
    }
  });

  return server;
}

module.exports = { createServer };
