// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

const MESSAGES = {
  messageText: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  messageCaseMissing: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  messageCaseInvalid: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`
}

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {

  const server = http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const text = url.pathname.slice(1);
    const caseName = url.searchParams.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({message: MESSAGES.messageText});
    }

    if (!caseName) {
      errors.push({message: MESSAGES.messageCaseMissing})
    } else if (!CASES.includes(caseName)) {
        errors.push({message: MESSAGES.messageCaseInvalid});
    }

    if (errors.length > 0) {
      const errorsObj = { errors: errors };
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(errorsObj));
      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');
    const { originalCase, convertedText } = convertToCase(text, caseName);
    const resultObj = {
      originalCase: originalCase,
      targetCase: caseName,
      originalText: text,
      convertedText: convertedText
    }
    res.end(JSON.stringify(resultObj));
  })

  return server;
}


module.exports = { createServer };

