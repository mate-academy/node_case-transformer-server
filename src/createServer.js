/* eslint-disable no-useless-escape */
'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizeUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizeUrl.pathname.slice(1);
    const paramsCase = normalizeUrl.searchParams.get('toCase');
    const allCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".',
      });
    };

    if (!paramsCase) {
      errors.push({
        message: '\"toCase\" query param is required. '
        + 'Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".',
      });
    } else if (!allCase.includes(paramsCase)) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = '400';
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return errors;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, paramsCase);

    res.statusCode = '200';
    res.statusMessage = 'Ok';

    res.end(JSON.stringify({
      originalCase,
      targetCase: paramsCase,
      originalText: textToConvert,
      convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
