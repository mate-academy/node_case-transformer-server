const http = require('http');
const verifyData = require('./verifyData').verifyData;
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = verifyData(text, toCase);

    res.setHeader('content-type', 'application/json');

    if (errors.length) {
      res.statusMessage = 'Bad request';
      res.statusCode = '400';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(text, toCase);

    res.statusCode = '200';
    res.statusMessage = 'OK';

    const responceToUser = {
      ...convertedText,
      targetCase: toCase,
      originalText: text,
    };

    res.end(JSON.stringify(responceToUser));
  });

  return server;
};

exports.createServer = createServer;
