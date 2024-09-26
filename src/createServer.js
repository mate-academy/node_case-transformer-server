const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getReqData } = require('./getReqData');
const { validateReq } = require('./validateReq');
const { sendReq } = require('./sendReq');

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, caseName } = getReqData(req);
    const errors = validateReq(text, caseName);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = errors.length ? 400 : 200;

    if (errors.length) {
      sendReq(res, { errors });

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

    sendReq(res, resBody);
  });

  return server;
}

module.exports = {
  createServer,
};
