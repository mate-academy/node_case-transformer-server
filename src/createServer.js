// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');
const { convertToCase } = require('./convertToCase/index');

const createServer = () =>
  http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, 'http://localhost');
    const params = new URLSearchParams(urlObj.search);
    const text = urlObj.pathname.split('/').join('');
    const toCase = params.get('toCase');
    const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const hasError =
      !text.length || !toCase?.length || !caseTypes.includes(toCase);

    res.setHeader('Content-Type', 'application/json');

    if (hasError) {
      const errors = [];

      if (!text?.length) {
        errors.push({
          message:
            'Text to convert is required.' +
            ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!toCase?.length) {
        errors.push({
          message:
            '"toCase" query param is required.' +
            ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!caseTypes.includes(toCase)) {
        errors.push({
          message:
            'This case is not supported.' +
            ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          errors,
        }),
      );
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    return res.end(
      JSON.stringify({
        originalCase,
        convertedText,
        targetCase: toCase,
        originalText: text,
      }),
    );
  });

module.exports = { createServer };
