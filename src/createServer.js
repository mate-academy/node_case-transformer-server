const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { handlerErrors } = require('./handlerErrors.js');
const { sendSuccessResponse } = require('./sendSuccessResponse.js');

const PORT = process.env.PORT || 3000;
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://localhost:${PORT}`);
    const textToTransform = normalizedURL.pathname.slice(1);
    const caseType = (normalizedURL.searchParams.get('toCase') || '').toUpperCase();

    try {
      handlerErrors(SUPPORTED_CASES, textToTransform, caseType);

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
