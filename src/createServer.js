const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string} text
 * @param {CaseName | null} toCase
 *
 * @returns {string[]}
 */
function checkParams(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push(
      'Text to convert is required.' +
        ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  if (toCase === null) {
    errors.push(
      '"toCase" query param is required.' +
        ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  } else if (!AVAILABLE_CASES.includes(toCase.toUpperCase())) {
    errors.push(
      'This case is not supported.' +
        ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    );
  }

  return errors;
}

exports.createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-type', 'application/json');

    const errors = checkParams(text, toCase);

    if (errors.length) {
      const data = {
        errors: errors.map((error) => ({
          message: error,
        })),
      };

      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      res.end(JSON.stringify(data));

      return;
    }

    const targetCase = toCase.toUpperCase();
    const convertingData = convertToCase(text, targetCase);

    const responseData = {
      originalCase: convertingData.originalCase,
      targetCase,
      originalText: text,
      convertedText: convertingData.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(responseData));
  });

  return server;
};
