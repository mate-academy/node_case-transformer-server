const http = require('http');
const { getURLErrors } = require('./URLValidator');
const { getTextAndCase } = require('./URLHandler');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    const [textToConvert, toCase] = getTextAndCase(req.url);

    const errors = getURLErrors(textToConvert, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textToConvert, toCase);

      const responseBody = JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      });

      res.end(responseBody);
    }
  });

  return server;
};

module.exports.createServer = createServer;
