// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

const urlPattern = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, 'http://localhost:5070');
    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push(`Text to convert is required. Correct request is: ${urlPattern}`);
    }

    if (!toCase) {
      errors.push(`"toCase" query param is required. Correct request is: ${urlPattern}`);
    } else {
      const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

      if (!supportedCases.includes(toCase.toUpperCase())) {
        /* eslint-disable-next-line max-len */
        errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
      }
    }

    if (errors.length > 0) {
      return respondWithError(res, 400, errors);
    }

    const result = convertToCase(textToConvert, toCase);

    const responseJson = {
      originalCase: result.originalCase,
      targetCase: toCase.toUpperCase(),
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseJson));
  });
};

function respondWithError(res, resStatus, messages) {
  const errorPayload = {
    errors: messages.map(message => ({ message })),
  };

  res.writeHead(resStatus, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(errorPayload));
}

module.exports = {
  createServer,
};
