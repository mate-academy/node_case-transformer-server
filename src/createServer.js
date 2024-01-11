// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const PORT = 'http://localhost:3000';
const urlTemplate = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const erorrMessages = {
  invalidCase:
    `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
  noToCaseParam:
    `"toCase" query param is required. Correct request is: ${urlTemplate}`,
  noTextToConvert:
    `Text to convert is required. Correct request is: ${urlTemplate}`,
};

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const error = {
      errors: [],
    };

    const { pathname, searchParams } = new URL(req.url, PORT);

    const originalText = pathname.slice(1);

    if (originalText.includes('favicon')) {
      return res.end();
    };

    const targetCase = searchParams.get('toCase');

    if (targetCase) {
      const isSupportedCase = supportedCases.includes(targetCase);

      if (!isSupportedCase) {
        error.errors.push({
          message: erorrMessages.invalidCase,
        });
      }
    } else {
      error.errors.push({
        message: erorrMessages.noToCaseParam,
      });
    }

    if (originalText === '') {
      error.errors.push({
        message: erorrMessages.noTextToConvert,
      });
    }

    if (error.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.write(JSON.stringify(error));

      return res.end();
    }

    const convertedTextData = convertToCase(originalText, targetCase);

    res.statusCode = 200;

    res.write(JSON.stringify({
      originalText,
      targetCase,
      ...convertedTextData,
    }));

    return res.end();
  });

  return server;
}

createServer().listen(3000);

module.exports = {
  createServer,
};
