/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { sendError } = require('./utils/sendError');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    const messages = [];

    if (!textToConvert) {
      messages.push({ message: errorMessages.noText });
    }

    if (!targetCase) {
      messages.push({ message: errorMessages.noCase });
    }

    if (targetCase && !supportedCases.includes(targetCase)) {
      messages.push({ message: errorMessages.invalidCase });
    }

    if (messages.length > 0) {
      sendError(res, 400, messages);

      return;
    }

    const result = convertToCase(textToConvert, targetCase);

    const response = {
      originalCase: result.originalCase,
      targetCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
