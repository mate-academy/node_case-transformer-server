const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorMessage, caseName } = require('./errorMessage');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'application/json' });

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    if (!originalText && !targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.missingText },
          { message: errorMessage.missingParam },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText && !caseName.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.caseNotSupported },
          { message: errorMessage.missingText },
        ],
      }));

      res.end();

      return;
    }

    if (!targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          {
            message: errorMessage.missingParam,
          },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          {
            message: errorMessage.missingText,
          },
        ],
      }));

      res.end();

      return;
    }

    if (!caseName.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.caseNotSupported },
        ],
      }));

      res.end();

      return;
    };

    res.statusCode = 200;

    const result = convertToCase(originalText, targetCase);

    res.write(JSON.stringify({
      originalCase: result.originalCase,
      targetCase,
      originalText,
      convertedText: result.convertedText,
    }));

    res.end();
  });

  return server;
};

module.exports = {
  createServer,
};
