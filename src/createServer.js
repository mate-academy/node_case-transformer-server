const http = require('http');

const url = require('url');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./utils/getErrors');
const CASES_TO_CONVERT = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERROR_MESSAGES = {
  textToConvertError: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,

  toCaseError: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,

  caseToConvertError: `This case is not supported. Available cases: ${CASES_TO_CONVERT.join(', ')}.`,
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

    const errors = getErrors(
      textToConvert,
      toCase,
      CASES_TO_CONVERT,
      ERROR_MESSAGES,
    );

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    const responseBody = {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = {
  createServer,
};
