/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { supportedCases } = require('./constants');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const query = parsedUrl.searchParams;

    const convertedText = path.slice(1);
    const targetCase = query.get('toCase');

    const errors = [];

    // Define constant error message strings.
    const correctRequestText = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const availableCases = 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    // Check for errors in the request.
    if (!convertedText) {
      errors.push({ message: `Text to convert is required. ${correctRequestText}` });
    }

    if (!targetCase) {
      errors.push({ message: `"toCase" query param is required. ${correctRequestText}` });
    } else {
      const upperCaseTargetCase = targetCase.toUpperCase();

      if (!supportedCases.includes(upperCaseTargetCase)) {
        errors.push({ message: `This case is not supported. ${availableCases}` });
      }
    }

    const response = {
      status: errors.length > 0 ? 400 : 200,
      statusText: errors.length > 0 ? 'Bad Request' : 'OK',
      headers: { 'Content-Type': 'application/json' },
      body: errors.length > 0 ? { errors } : {},
    };

    if (!errors.length) {
      const upperCaseTargetCase = targetCase.toUpperCase();
      const result = convertToCase(convertedText, upperCaseTargetCase);

      response.body = {
        originalText: convertedText,
        targetCase: upperCaseTargetCase,
        convertedText: result.convertedText,
        originalCase: result.originalCase,
      };
    }

    res.writeHead(response.status, response.statusText, response.headers);
    res.end(JSON.stringify(response.body));
  });

  return server;
};

module.exports = { createServer };
