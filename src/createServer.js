const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { validateError } = require('./error/validateError');

const HOST = 'http://localhost:3000';
const urlTemplate = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  invalidCase:
    `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
  noToCaseParam:
    `"toCase" query param is required. Correct request is: ${urlTemplate}.`,
  noTextToConvert:
    `Text to convert is required. Correct request is: ${urlTemplate}.`,
};

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new URL(req.url, HOST);
    const originalText = pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    if (originalText.includes('favicon')) {
      return res.end();
    };

    const error = validateError(
      targetCase,
      supportedCases,
      errorMessages,
      originalText,
    );

    if (error.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.write(JSON.stringify(error));

      return res.end();
    };

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

module.exports = {
  createServer,
};
