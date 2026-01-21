const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { validator } = require('./validator');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const partsUrl = req.url.split('?');
    const params = new URLSearchParams(partsUrl[1]);
    const toCase = params.get('toCase');
    const errors = validator(partsUrl[0].slice(1), toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const resultData = convertToCase(partsUrl[0].slice(1), toCase);
    const allData = {
      convertedText: resultData.convertedText,
      originalCase: resultData.originalCase,
      originalText: partsUrl[0].slice(1),
      targetCase: toCase,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(allData));
  });

  return server;
};

module.exports = {
  createServer,
};
