/* eslint-disable max-len */
const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase.js');
const { getQueryParamsError } = require('./server/getQueryParamsError.js');
const { parseUrl } = require('./server/parseUrl.js');
const { sendResponse } = require('./server/sendResponse.js');

const createServer = () => {
  return http.createServer((req, res) => {
    const { targetCase, originalText } = parseUrl(req);

    const errors = getQueryParamsError(originalText, targetCase);

    if (errors.length > 0) {
      const errorData = {
        errors: errors.map((error) => ({ message: error.message })),
      };

      return sendResponse(res, errorData, 400);
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const resData = {
      originalCase,
      originalText,
      targetCase,
      convertedText,
    };

    sendResponse(res, resData, 200);
  });
};

module.exports = {
  createServer,
};
