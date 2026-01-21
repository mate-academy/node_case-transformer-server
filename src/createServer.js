const http = require('http');
const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');

// const PORT = process.env.PORT || 3000;

const createServer = () => {
  const server = http.createServer((req, res) => {
    if (!req.url) {
      res.statusCode = 404;
      res.end('Not Found');

      return;
    }

    const myURL = new URL(req.url, 'http://localhost');
    const targetCase = myURL.searchParams.get('toCase');
    const originalText = req.url.split('?')[0].slice(1);

    const errors = [];

    if (!myURL.searchParams.has('toCase')) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase) &&
      targetCase !== null
    ) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (originalText.length === 0) {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({ errors }));

      return;
    }

    const originalCase = detectCase(originalText);
    const convertedText = convertToCase(originalText, targetCase).convertedText;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

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
};

module.exports = {
  createServer,
};

// createServer().listen(PORT);
