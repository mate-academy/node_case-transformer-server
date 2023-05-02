const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => http.createServer((req, res) => {
  const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
  const textToConvert = normalizeURL.pathname.slice(1);
  const convertFormat = normalizeURL.searchParams.get('toCase');

  res.setHeader('Content-Type', 'application/json');

  const resultOfConver = convertToCase(textToConvert, convertFormat);
  const resultConvertingString = resultOfConver.convertedText;

  const response = {
    originalCase: resultOfConver.originalCase,
    targetCase: convertFormat,
    originalText: textToConvert,
    convertedText: resultConvertingString,
  };

  if (!textToConvert) {
    res.statusCode = 400;

    res.end(
      'Text to convert is required'
      + '. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
    );
  } else if (!convertFormat) {
    res.statusCode = 400;

    res.end('"toCase" query param is required.'
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"');
  } else if (
    !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']
      .includes(convertFormat.toUpperCase())) {
    res.statusCode = 400;

    res.end('This case is not supported.'
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
  }

  res.end(JSON.stringify(response));
});

module.exports = {
  createServer,
};
