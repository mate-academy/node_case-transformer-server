const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkErrors } = require('./checkErrors');

const createServer = () => http.createServer((req, res) => {
  const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
  const textToConvert = normalizeURL.pathname.slice(1);
  const toCase = normalizeURL.searchParams.get('toCase');

  res.setHeader('Content-Type', 'application/json');

  const errors = checkErrors(textToConvert, toCase);

  if (errors.length) {
    res.statusCode = 400;

    res.end(JSON.stringify({
      errors,
    }));
  } else {
    const resultOfConver = convertToCase(textToConvert, toCase);
    const resultConvertingString = resultOfConver.convertedText;

    const response = {
      originalCase: resultOfConver.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: resultConvertingString,
    };

    res.end(JSON.stringify(response));
  }
});

module.exports = {
  createServer,
};
