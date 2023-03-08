const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./getErrors');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normilizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToTransform = normilizedURL.pathname.slice(1);
    const typeToTransform = normilizedURL.searchParams.get('toCase');
    const errors = getErrors(textToTransform, typeToTransform);

    if (!errors.length) {
      const transformedData = convertToCase(textToTransform, typeToTransform);

      const response = {
        ...transformedData,
        targetCase: typeToTransform,
        originalText: textToTransform,
      };

      sendResponse(res, 200, response);
    } else {
      const response = {
        errors,
      };

      sendResponse(res, 400, response);
    };
  });

  return server;
};

module.exports = {
  createServer,
};
