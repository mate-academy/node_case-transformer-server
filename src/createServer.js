const http = require('http');

// http//localchost:8080/test?url?toCASE=shake

const TRANSFORM_FORMATS_URL = [
  'SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER',
];

function createServer() {
  const server = http.createServer((req, res) => {

    const url = new URL(`http://${req.headers.host}${req.url}`);
    const textTransform = url.pathname.slice(1);
    const transformFormat = url.searchParams.get('toCase');

    const errors = [];

    if (!textTransform) {
      errors.push({
        message: 'Text to convert is required. Correct request is:'
        + '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
      });
    }

    if (!transformFormat) {
      errors.push({
        message: '"toCase" query param is required. Correct request is:'
          + '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
      });
    }

    if (
      transformFormat
      && !TRANSFORM_FORMATS_URL.includes(transformFormat)
    ) {
      errors.push({
        message: 'This case is not supported. Available cases:'
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      const payload = { errors };

      res.end(JSON.stringify(payload));

      return;
    }

    res.end('fd');
  });

  server.listen(8080, () => {
    // eslint-disable-next-line no-console
    console.log('working...');
  });
}

createServer();

module.exports = { createServer };
