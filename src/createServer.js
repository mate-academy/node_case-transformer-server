/* eslint-disable operator-linebreak */
function createServer() {
  const http = require('http');

  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const RESULT_DATA = {};
    const TEXT = normalizedURL.pathname.slice(1);
    const CASE_VARIANTS = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const CASE_NAME = normalizedURL.searchParams.get('toCase');

    res.setHeader('content-type', 'application/json');

    if (TEXT < 1) {
      RESULT_DATA.errors = [
        {
          message:
            'Text to convert is required. Correct request ' +
            'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        },
      ];
    }

    if (!CASE_NAME) {
      const NO_CASE_MESSAGE = {
        message:
          '"toCase" query param is required. Correct request ' +
          'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      };

      if (RESULT_DATA.errors && RESULT_DATA.errors.length > 0) {
        RESULT_DATA.errors.push(NO_CASE_MESSAGE);
      } else {
        RESULT_DATA.errors = [NO_CASE_MESSAGE];
      }
    }

    if (CASE_NAME && !CASE_VARIANTS.includes(CASE_NAME)) {
      const INVALID_CASE_MESSAGE = {
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      };

      if (RESULT_DATA.errors && RESULT_DATA.errors.length > 0) {
        RESULT_DATA.errors.push(INVALID_CASE_MESSAGE);
      } else {
        RESULT_DATA.errors = [INVALID_CASE_MESSAGE];
      }
    }

    if (!RESULT_DATA.errors) {
      const { convertToCase } = require('./convertToCase');

      const CONVERTATION_RESULT = convertToCase(TEXT, CASE_NAME);
      const CONVERTATION_ORIGINAL_VALUES = {
        originalText: TEXT,
        targetCase: CASE_NAME,
      };

      Object.assign(CONVERTATION_RESULT, CONVERTATION_ORIGINAL_VALUES);

      Object.assign(RESULT_DATA, CONVERTATION_RESULT);
      res.statusCode = 200;
    } else {
      res.statusCode = 400;
    }

    res.statusCode = RESULT_DATA.errors ? 400 : 200;
    res.statusMessage = RESULT_DATA.errors ? 'Bad request' : 'OK';
    res.end(JSON.stringify(RESULT_DATA));
  });
}

module.exports = { createServer };
