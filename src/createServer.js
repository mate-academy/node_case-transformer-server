const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const BASE = 'http://localhost:5700';
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () =>
  http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedURL = new URL(req.url, BASE);
    const inputText = normalizedURL.pathname.slice(1) || '';
    const toCase = normalizedURL.searchParams.get('toCase') || '';
    const errors = [];
    const errorTypes = {
      noText: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      noQuery: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      impossibleCase:
      /* eslint-disable-next-line max-len */
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    };
    const transformedText = {
      originalCase: '',
      targetCase: toCase,
      originalText: inputText,
      convertedText: '',
    };

    if (!inputText) {
      errors.push({
        message: errorTypes.noText,
      });

      if (cases.includes(toCase.toUpperCase())) {
        res.statusCode = 404;

        res.end(JSON.stringify({ errors }));

        return;
      }
    }

    if (!toCase) {
      errors.push({
        message: errorTypes.noQuery,
      });
    }

    if (toCase) {
      try {
        const { originalCase, convertedText } = convertToCase(
          inputText,
          toCase.toUpperCase(),
        );

        res.statusCode = 200;
        transformedText.originalCase = originalCase;
        transformedText.convertedText = convertedText;

        res.end(
          JSON.stringify({
            ...transformedText,
          }),
        );
      } catch (err) {
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 404;

        errors.push({
          message: errorTypes.impossibleCase,
        });
      }
    }

    if (errors.length) {
      res.end(
        JSON.stringify({
          errors,
        }),
      );
    }
  });

module.exports = { createServer };
