
const http = require('http');
const { errorMessage } = require('./errorMessage');
const { convertToCase } = require('./convertToCase/convertToCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    if (!originalText && !targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.textIsRequired },
          { message: errorMessage.caseIsIsRequired },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText && !targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.textIsRequired },
          { message: errorMessage.caseIsIsRequired },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText && supportedCases.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.textIsRequired },
        ],
      }));

      res.end();

      return;
    }

    if (!targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.caseIsIsRequired },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText && !supportedCases.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.textIsRequired },
          { message: errorMessage.caseIsNotSupported },
        ],
      }));

      res.end();

      return;
    }

    if (!supportedCases.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.caseIsNotSupported },
        ],
      }));

      res.end();

      return;
    }

    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.write(JSON.stringify(result));
    res.end();
  });

  return server;
};

module.exports = {
  createServer,
};
