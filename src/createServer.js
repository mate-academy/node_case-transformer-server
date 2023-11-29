const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const errorMessages = {
      errors: [
      ],
    };

    const [originalText, queryString] = req.url.slice(1).split('?');

    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    if (!originalText) {
      res.statusCode = 400;

      errorMessages.errors.push(
        { message: 'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      );
    }

    if (!targetCase) {
      res.statusCode = 400;

      errorMessages.errors.push(
        { message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      );
    }

    if (!caseTypes.includes(targetCase) && targetCase) {
      res.statusCode = 400;

      errorMessages.errors.push(
        { message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
      );
    }

    if (errorMessages.errors.length) {
      res.end(JSON.stringify(errorMessages));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        originalCase, targetCase, originalText, convertedText,
      }));
    }
  });
}

module.exports.createServer = createServer;
