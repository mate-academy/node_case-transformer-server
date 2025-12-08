/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/index');

const PORT = 8080;

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      const [path, queryString] = req.url.split('?');

      const textToConvert = path.startsWith('/') ? path.slice(1) : path;

      const params = new URLSearchParams(queryString || '');
      const toCase = params.get('toCase');

      const errors = [];

      if (!textToConvert) {
        errors.push({
          message:
            'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!toCase) {
        errors.push({
          message:
            '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (toCase && !SUPPORTED_CASES.includes(toCase)) {
        errors.push({
          message: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
        });
      }

      if (errors.length > 0) {
        res.statusCode = 400;
        res.statusMessage = 'Bad request';

        return res.end(JSON.stringify({ errors }));
      }

      const conversionResult = await convertToCase(textToConvert, toCase);

      const { originalCase, convertedText } = conversionResult;

      const responsePayload = {
        originalCase: originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(responsePayload));
    } catch (err) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';

      res.end(
        JSON.stringify({
          errors: [{ message: 'Internal Server Error' }],
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer, PORT };
