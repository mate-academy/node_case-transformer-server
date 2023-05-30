/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const avaliableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrld = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedUrld.searchParams.get('toCase');
    const textToConvert = normalizedUrld.pathname.slice(1);

    const validation = {
      errors: [],
    };

    if (!textToConvert) {
      validation.errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!toCase) {
      validation.errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!avaliableCases.includes(toCase) && toCase) {
      validation.errors.push({ message: `This case is not supported. Available cases: ${avaliableCases.join(', ')}.` });
    }

    if (validation.errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(validation));
    }

    const { originalCase, convertedText } = convertToCase(textToConvert, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    }));
  });
}

createServer();

module.exports = { createServer };
