const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getErrors } = require('./getErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = req.url;
    const [pathName, queryString] = url.split('?');
    const text = pathName.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = getErrors(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return server;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    }));
  });

  return server;
};

module.exports = { createServer };
