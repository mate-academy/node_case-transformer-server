// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

// const PORT = process.env.PORT || 3000;
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    // const normalizedURL = new URL(req.url, `http://localhost:${PORT}`);
    const [path, queryString] = req.url.split('?');

    const text = decodeURIComponent((path || '').slice(1)); // текст из URL

    // получаем значение toCase из query, если есть
    // const toCaseParam = queryString?.split('=')[1] || '';

    const params = new URLSearchParams(queryString || '');
    const toCaseParam = params.get('toCase');

    const caseName = cases.includes(toCaseParam) ? toCaseParam : '';

    const errorMessages = [];

    if (!text) {
      errorMessages.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCaseParam) {
      errorMessages.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!caseName) {
      errorMessages.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errorMessages.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors: errorMessages }));

      return;
    }

    let findObject = {};

    if (text && caseName) {
      findObject = convertToCase(text, caseName);
    }

    const result = {
      originalCase: findObject.originalCase,
      targetCase: caseName,
      originalText: text,
      convertedText: findObject.convertedText,
    };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });

  // server.listen(PORT, () => {
  //   console.log(`Server started on WOW-WOW port ${PORT}`);
  // });

  return server;
}

module.exports = { createServer };
// createServer();
