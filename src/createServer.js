/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const PORT = process.env.PORT || 5701;
const SUPPORTEDCASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERRORMESSAGE = {
  textRequired: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  caseRequired: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  caseSupported: `This case is not supported. Available cases: ${SUPPORTEDCASES.join(', ')}.`,
};

function createServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const normUrl = new URL(req.url, `http://localhost:${PORT}`);
    const text = normUrl.pathname.slice(1);
    const targetCase = normUrl.searchParams.get('toCase');
    const errors = [];

    try {
      if (!text) {
        errors.push({
          message: ERRORMESSAGE.textRequired,
        });
      }

      if (!targetCase) {
        errors.push({
          message: ERRORMESSAGE.caseRequired,
        });
      }

      if (!SUPPORTEDCASES.includes(targetCase.toUpperCase())) {
        errors.push({
          message: ERRORMESSAGE.caseSupported,
        });
      }

      if (errors.length) {
        throw new Error('error');
      }

      const { originalCase, convertedText } = convertToCase(text, targetCase);
      const response = {
        originalCase: originalCase,
        targetCase: targetCase,
        originalText: text,
        convertedText: convertedText,
      };

      res.end(JSON.stringify(response));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = { createServer };
