const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer(
    (req, res) => {
      const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
      const [convertText, queryString] = req.url.split('?');
      const originalText = convertText.slice(1);
      const params = new URLSearchParams(queryString);
      const toCase = params.get('toCase');
      const errorMessages = {
        noTextMessage: 'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        noParam: '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        invalidCase: 'This case is not supported. '
          + `Available cases: ${cases.join(', ')}.`,
      };
      const errors = [];

      res.setHeader('Content-type', 'application/json');

      if (!originalText) {
        errors.push({ message: errorMessages.noTextMessage });
      }

      if (!toCase) {
        errors.push({ message: errorMessages.noParam });
      }

      if (!cases.includes(toCase) && toCase?.length) {
        errors.push({ message: errorMessages.invalidCase });
      }

      if (errors.length) {
        res.statusCode = 404;
        res.statusText = 'Bad request';
        res.end(JSON.stringify(errors));

        return;
      }

      const {
        originalCase, convertedText,
      } = convertToCase(originalText, toCase);

      res.statusCode = 200;

      res.end(JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText,
        convertedText,
      }));
    },
  );
};

module.exports = { createServer };
