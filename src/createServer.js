const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.search.replace(/.*=/g, '');
    const errors = [];
    const urlEx = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errorMessages = [
      `Text to convert is required. Correct request is: ${urlEx}`,
      `"toCase" query param is required. Correct request is: ${urlEx}`,
      `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
    ];

    const makeError = (...ErrMessage) => {
      ErrMessage.map(message => {
        return errors.push({
          message,
        });
      });
      res.statusCode = 400;

      res.end(JSON.stringify({
        errors,
      }));
    };

    if (!originalText && !targetCase) {
      makeError(errorMessages[0], errorMessages[1]);

      return;
    }

    if (!originalText && !supportedCases.includes(targetCase)) {
      makeError(errorMessages[0], errorMessages[2]);

      return;
    }

    if (!originalText) {
      makeError(errorMessages[0]);

      return;
    }

    if (!targetCase) {
      makeError(errorMessages[1]);

      return;
    }

    if (!supportedCases.includes(targetCase)) {
      makeError(errorMessages[2]);

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    res.statusCode = 200;

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

module.exports = { createServer };
