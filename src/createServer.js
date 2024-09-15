const http = require('http');
const { getError } = require('./getError');
const { requestData } = require('./requestData');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { inputText, toCase } = requestData(req);

    const errorMessages = getError(toCase, inputText);

    if (errorMessages.errors.length > 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify(errorMessages));
    }

    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(inputText, toCase);

    return res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: inputText,
      convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
