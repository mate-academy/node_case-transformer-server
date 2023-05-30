const http = require('http');
const { getData } = require('./getData');
const { validateData } = require('./validateData');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [textToConvert, caseName] = getData(req);
    const errors = validateData(textToConvert, caseName);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      return res.end(JSON.stringify({ errors }));
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, caseName);

    return res.end(JSON.stringify({
      originalCase,
      targetCase: caseName,
      originalText: textToConvert,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
