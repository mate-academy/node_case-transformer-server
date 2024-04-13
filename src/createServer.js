/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTEDCASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERRORMESSAGE = {
  textRequired: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  caseRequired: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  caseSupported: `This case is not supported. Available cases: ${SUPPORTEDCASES.join(', ')}.`,
};

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const normalizedUrl = new URL(req.url, 'http://localhost:3006');

    const originalText = normalizedUrl.pathname.slice(1);

    const errors = [];

    if (!originalText || !originalText.trim()) {
      errors.push({
        message: ERRORMESSAGE.textRequired,
      });
    }

    const targetCase = normalizedUrl.searchParams.get('toCase');

    if (!targetCase) {
      errors.push({
        message: ERRORMESSAGE.caseRequired,
      });
    } else {
      if (!SUPPORTEDCASES.includes(targetCase.toUpperCase())) {
        errors.push({
          message: ERRORMESSAGE.caseSupported,
        });
      }
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
