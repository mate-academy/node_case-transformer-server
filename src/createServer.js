const http = require('http');
const { normalizeUrl } = require('./normalizeUrl');
const { validateData } = require('./checkData');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const [textToConvert, caseType] = normalizeUrl(req);
    const errors = validateData(textToConvert, caseType);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      return res.end(JSON.stringify({ errors }));
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, caseType);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    return res.end(JSON.stringify({
      originalCase,
      targetCase: caseType,
      originalText: textToConvert,
      convertedText,
    }));
  });
}

module.exports = {
  createServer,
};
