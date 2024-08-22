/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { sendErrorResponse } = require('./sendErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const standarType = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    // const normalizedURL = new URL(req.url, 'http://localhost:5700');

    const [baseURL, query] = req.url.split('?');
    const params = new URLSearchParams(query);

    const toCase = params.get('toCase');
    const text = baseURL.slice(1);

    // const text = normalizedURL.pathname.slice(1);
    // const toCase = normalizedURL.searchParams.get('toCase');

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!standarType.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      // console.log(errors);
      return sendErrorResponse(res, errors);
    }

    const convertText = convertToCase(text, toCase);

    const response = {
      originalCase: convertText.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: convertText.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    req.on('data', (data) => console.log(data));

    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
