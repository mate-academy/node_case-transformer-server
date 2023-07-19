const http = require('http');
const { convertToCase } = require('./convertToCase')
const { validateURL } = require('./validateURL')

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);

    const errorMessage = validateURL(toCase, textToConvert);

    if (errorMessage.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errorMessage));
    } else {
      res.statusCode = 200;

      const transformedText = convertToCase(textToConvert, toCase);
      const data = {
        ...transformedText,
        targetCase: toCase,
        originalText: textToConvert,
      };

      res.end(JSON.stringify(data));
    }
  });
}

module.exports = {
  createServer,
}
