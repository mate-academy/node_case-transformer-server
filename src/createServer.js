const http = require('http');
const { convertToCase } = require('./convertToCase');
const { cases } = require('./cases');
const { errorMessages } = require('./errorMessages');

function createServer() {
  return http.createServer((req, res) => {
    const urlArr = req.url.split('?');
    const text = urlArr[0].slice(1);
    const params = new URLSearchParams(urlArr[1]);
    const toCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!text) {
      errors.push({
        message: errorMessages.noText,
      });
    }

    if (!toCase) {
      errors.push({
        message: errorMessages.noCase,
      });
    }

    if (toCase && !cases.includes(toCase)) {
      errors.push({
        message: errorMessages.wrongCase,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      ...convertToCase(text, toCase),
      targetCase: toCase,
      originalText: text,
    }));
  });
}

module.exports = {
  createServer,
};
