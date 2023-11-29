const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const requestedUrl = req.url.slice(1);

    const textToConvert = requestedUrl.split('?')[0];
    let queryString = '';

    const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errorMessages = [];

    if (requestedUrl.split('?').length > 1) {
      queryString = requestedUrl.split('?')[1];
    }

    const params = new URLSearchParams(queryString);

    if (params.getAll('toCase').length !== 1) {
      errorMessages.push({ message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    };

    const toCase = params.get('toCase');

    if (!textToConvert) {
      errorMessages.push({ message: 'Text to convert is required. '
            + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    };

    if (toCase
      && (!caseTypes.includes(toCase))) {
      errorMessages.push({ message: 'This case is not supported. '
            + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    };

    if (errorMessages.length > 0) {
      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;

      const errorMessage = {
        errors: errorMessages,
      };

      res.end(JSON.stringify(errorMessage));

      return;
    };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const result = JSON.stringify({
      ...convertToCase(textToConvert, toCase),
      originalText: textToConvert,
      targetCase: toCase,
    });

    res.end(result);
  });

  return server;
};

module.exports = {
  createServer,
};
