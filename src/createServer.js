/* eslint-disable no-console */
/* eslint-disable max-len */
'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');

function getParamsFromUrlForTextConverting(req) {
  const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

  const originalText = normalizedUrl.pathname.slice(1);
  const targetCase = normalizedUrl.searchParams.get('toCase');

  return { originalText, targetCase };
}

function validateParamsFromUrl(textFromUrl, caseFromUrl) {
  const errors = [];
  const caseList = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!textFromUrl) {
    errors.push('<Text> to convert is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>');
  }

  if (!caseFromUrl) {
    errors.push('<toCase> query param is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>');
  } else if (!caseList.includes(caseFromUrl)) {
    errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER');
  }

  return errors.length > 0 ? errors : null;
}

const server = http.createServer((req, res) => {
  const { originalText, targetCase } = getParamsFromUrlForTextConverting(req);
  const errors = validateParamsFromUrl(originalText, targetCase);

  if (errors) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(errors.join(', ')));
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const originalCase = detectCase(originalText);
    const { convertedText } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
