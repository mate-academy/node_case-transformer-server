const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const errorsMessages = require('./utils/errorsMessages');
const { sendSuccessResponse } = require('./utils/sendSuccessResponse');
const { sendErrorResponse } = require('./utils/sendErrorResponse');
const { handleRequest } = require('./utils/handleRequest');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const {
      textToTransform,
      allowedCases,
      toCase,
    } = handleRequest(req);
    const validation = {
      errors: [],
    };

    res.setHeader('Content-Type', 'application/json');

    if (!textToTransform) {
      validation.errors.push({
        message: errorsMessages.noTextError,
      });
    }

    if (!toCase) {
      validation.errors.push({
        message: errorsMessages.noCaseError,
      });
    }

    if (!(allowedCases.includes(toCase)) && toCase) {
      validation.errors.push({
        message: errorsMessages.invalidCaseError,
      });
    }

    if (validation.errors.length) {
      const result = JSON.stringify(validation);

      sendErrorResponse(res, result);
    }

    if (!validation.errors.length) {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textToTransform, toCase);

      const result = JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textToTransform,
        convertedText,
      });

      sendSuccessResponse(res, result);
    }
  });

  return server;
};

module.exports = {
  createServer,
};
