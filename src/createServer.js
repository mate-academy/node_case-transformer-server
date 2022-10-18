const http = require('http');

const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const resultObj = {
    originalCase: 'CASE_NAME',
    targetCase: 'CASE_NAME',
    originalText: 'ORIGINAL_TEXT',
    convertedText: 'CONVERTED_TEXT',
  };

  const server = http.createServer((req, res) => {
    const errors = [];
    const supportedCases = [
      'SNAKE',
      'KEBAB',
      'CAMEL',
      'PASCAL',
      'UPPER',
    ];

    res.setHeader('Content-Type', 'application/json');

    const splitedURL = req.url.split('?');
    const params = new URLSearchParams(splitedURL[1]);
    const fromCase = splitedURL[0].replace('/', '');
    const toCase = params.get('toCase');

    if (!fromCase) {
      errors.push({
        message: 'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify(
        errors,
      ));

      return;
    }

    resultObj.originalCase = detectCase(fromCase);
    resultObj.targetCase = toCase;
    resultObj.originalText = fromCase;
    resultObj.convertedText = convertToCase(fromCase, toCase).convertedText;

    res.end(JSON.stringify(
      resultObj,
    ));
  });

  return server;
};

module.exports = { createServer };
