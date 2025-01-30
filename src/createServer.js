const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { caseNames, errorMessages } = require('./constants/index.js');
const { sendErrorResponse } = require('./utils/sendErrorResponse.js');

function createServer() {
  const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
      return sendErrorResponse(res, 405, errorMessages.onlyGetMethod);
    }

    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push(errorMessages.textRequired);
    }

    if (!targetCase) {
      errors.push(errorMessages.toCaseRequired);
    }

    if (targetCase && !caseNames.includes(targetCase)) {
      errors.push(errorMessages.caseNotSupported);
    }

    if (errors.length > 0) {
      return sendErrorResponse(res, 400, errors);
    }

    const convertedText = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');

    res.end(
      JSON.stringify({
        ...convertedText,
        targetCase,
        originalText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
