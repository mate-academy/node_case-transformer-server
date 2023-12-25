const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { setCase } = require('./setCase');
const { setTextToConvert } = require('./setTextToConvert');
const { returnError } = require('./returnError');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = req.url;
    const toCase = setCase(url);
    const text = setTextToConvert(url);
    const errors = returnError(text, toCase);

    if (errors.length > 0) {
      sendResponse(res, 'Bad request', 400, JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(text, toCase);

    sendResponse(res, 'OK', 200, JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: convertedText.convertedText,
    }));
  });

  return server;
};

module.exports = { createServer };
