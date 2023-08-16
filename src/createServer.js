const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { validationCase } = require('./validationCase');

const server = () => http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const params = new URLSearchParams(url.search);
  const toCase = params.get('toCase');
  const textToConvert = url.pathname.slice(1);

  function errorRes(errorMessages) {
    return {
      errors: errorMessages
        .map(errorMessage => ({ message: errorMessage })),
    };
  }

  function successRes(
    originalCase,
    targetCase,
    originalText,
    convertedText,
  ) {
    return {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };
  };

  const errors = validationCase(textToConvert, toCase);

  if (errors.length > 0) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(errorRes(errors)));

    return;
  }

  const {
    originalCase,
    convertedText,
  } = convertToCase(textToConvert, toCase);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // eslint-disable-next-line max-len
  res.end(JSON.stringify(successRes(originalCase, toCase, textToConvert, convertedText)));
});

module.exports = {
  createServer: server,
};
