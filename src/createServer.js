/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/');

const createServer = () => {
  const PORT = process.env.PORT || 3000;

  const server = http.createServer((req, res) => {
    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1) || '';
    const Case = normalizedUrl.searchParams.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    if (!textToConvert) {
      errors.push({
        // eslint-disable-next-line max-len
        textIsRequired: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!Case) {
      errors.push({
        // eslint-disable-next-line max-len
        caseIsRequired: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (Case && !(cases.includes(Case))) {
      errors.push({
        // eslint-disable-next-line max-len
        caseInvalid: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.setHeader('Content-Type', 'application/json');

    const convertedText = convertToCase(textToConvert, Case);

    res.statusCode = 200;
    res.statusMessage = 'Ok';

    res.end(JSON.stringify({
      Case,
      textToConvert,
      ...convertedText,
    }));
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  return server;
};

createServer();

module.exports = { createServer };
