const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { sendResponse } = require('./utils/sendResponse');
const { handleRequest } = require('./utils/handleRequest');
const { checkErrors } = require('./utils/checkErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const {
      textToTransform,
      toCase,
    } = handleRequest(req);

    const validation = {
      errors: checkErrors(textToTransform, toCase),
    };

    res.setHeader('Content-Type', 'application/json');

    if (validation.errors.length) {
      sendResponse(res, 400, 'Bad request', validation);
    }

    if (!validation.errors.length) {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textToTransform, toCase);

      const result = {
        originalCase,
        targetCase: toCase,
        originalText: textToTransform,
        convertedText,
      };

      sendResponse(res, 200, 'OK', result);
    }
  });

  return server;
};

module.exports = {
  createServer,
};
