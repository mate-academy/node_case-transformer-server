// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const addErrorToResponse = (errorResponse, errorMessage) => {
  errorResponse.errors.push({ message: errorMessage });
};

const caseNames = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

function createServer() {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname.substring(1);
    const query = Object.fromEntries(parsedUrl.searchParams);

    const errorResponse = {
      errors: [],
    };

    res.setHeader('Content-type', 'application/json');

    if (!path || path === '/') {
      res.statusCode = 400;

      addErrorToResponse(
        errorResponse,
        // eslint-disable-next-line max-len
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!query || !query.hasOwnProperty('toCase')) {
      res.statusCode = 400;

      addErrorToResponse(
        errorResponse,
        // eslint-disable-next-line max-len
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    const caseName = query.toCase;

    if (
      query.hasOwnProperty('toCase') &&
      (!caseName || !caseNames.has(caseName))
    ) {
      res.statusCode = 400;

      addErrorToResponse(
        errorResponse,
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (errorResponse.errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify(errorResponse));

      return;
    }

    const textConverted = convertToCase(path, caseName);
    const body = {
      originalCase: textConverted.originalCase,
      targetCase: caseName,
      originalText: path,
      convertedText: textConverted.convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(body));
  });

  return server;
}

module.exports = {
  createServer,
};
