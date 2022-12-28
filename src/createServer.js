const { getQueryInfo } = require('./modules/getQueryInfo.js');
const { convertToCase } = require('./convertToCase/convertToCase');
const { isCodeValid } = require('./modules/isCodeValid');
const http = require('http');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [text, toCase] = getQueryInfo(req);
    const errors = isCodeValid(text, toCase);

    if (errors.length) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const resultData = convertToCase(text, toCase);
    const result = {
      convertedText: resultData.convertedText,
      originalCase: resultData.originalCase,
      originalText: text,
      targetCase: toCase,
    };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });

  return server;
};

module.exports = {
  createServer,
};
