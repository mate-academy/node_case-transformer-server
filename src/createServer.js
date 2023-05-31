const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getReqData } = require('./getReqData');
const { validateReq } = require('./validateReq');

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, caseName } = getReqData(req);
    const errors = validateReq(text, caseName);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = errors.length ? 400 : 200;

    if (errors.length) {
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(text, caseName);

    const resBody = {
      originalCase,
      targetCase: caseName,
      originalText: text,
      convertedText,
    };

    res.end(JSON.stringify(resBody));
  });

  return server;
}

module.exports = {
  createServer,
};
