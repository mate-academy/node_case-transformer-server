// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, toCase } = extractArguments({
      requestUrl: req.url,
      headers: req.headers,
    });

    const errors = validateInput({ text, toCase });

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        convertedText,
        originalText: text,
      }),
    );
  });

  return server;
}

function extractArguments({ requestUrl, headers }) {
  const url = new URL(requestUrl, `http://${headers.host}`);

  const text = url.pathname.split('/')[1];
  const toCase = url.searchParams.get('toCase');

  return { text, toCase };
}

function validateInput({ text, toCase }) {
  const errors = [];

  if (!text) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (
    typeof toCase === 'string' &&
    !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
  ) {
    errors.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }

  return errors;
}

module.exports = {
  createServer,
};
